const express = require('express');
const fs = require('fs');
const os = require('os');
const escape = require('escape-html');
const marked = require('marked');
const bodyParser = require('body-parser')

marked.setOptions({
	sanitize: true
});

const template = (strings, ...keys) => {
  return ((...values) => {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach((key, i) => {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  });
};

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const index = 'static/index.html';

const appendToIndex = (template, content) => {
	const append_after = '<!--APPEND_POST_AFTER-->';

	const pos = template.indexOf(append_after);
	if (pos == -1) {
		console.log('append block not found!');
		return template;
	}
	const i = pos + append_after.length;
	return template.slice(0, i) + os.EOL + os.EOL + content + template.slice(i);
};

const readIndex = () => {
	return fs.readFileSync(index, 'utf8');
};

const writeIndex = (content) => {
	return fs.writeFileSync(index, content);
};

const postTemplate = template`
<h2>${0}</h2>

${1}

<blockquote><p>
${2}
</p></blockquote>
`;

const processTemplate = (title, content, tags) => {
	const linesHtml = content.match(/[^\r\n]+/g);

	let tagsHtml = '<span>' 
		+ tags.split(';').map(escape).join('</span>;' 
		+ os.EOL + '<span>') 
		+ '</span>';

	return postTemplate(escape(title), marked(content), tagsHtml);
};

const updateIndex = (content) => {
	writeIndex(appendToIndex(readIndex(), content));
};

app.post('/add', urlencodedParser, (req, res) => {
	const {title, content, tags} = req.body;
	updateIndex(processTemplate(title, content, tags));
	res.redirect('/');
});

app.use(express.static('static'));
app.listen(8080);