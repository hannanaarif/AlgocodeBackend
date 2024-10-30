const marked = require('marked');
const sanitizeHtml = require('sanitize-html');
const TurndownService = require('turndown');

function SanitizeMarkdownContent(content) {
    const turndownService = new TurndownService();

    // Convert Markdown to HTML
    const convertedHTML = marked.parse(content);
    console.log('Converted HTML:', convertedHTML);

    // Sanitize the HTML
    const sanitizedHTML = sanitizeHtml(convertedHTML, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
    });
    console.log('Sanitized HTML:', sanitizedHTML);

    // Convert sanitized HTML back to Markdown
    const sanitizedContent = turndownService.turndown(sanitizedHTML);
    console.log('Sanitized Markdown:', sanitizedContent);

    return sanitizedContent;
}

module.exports = SanitizeMarkdownContent;
