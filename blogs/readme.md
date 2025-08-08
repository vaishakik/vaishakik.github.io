# Blog System Documentation

This document explains how to create and format blog posts for the WhyShock portfolio blog system.

## Overview

The blog system uses embedded JavaScript data instead of external files to avoid CORS issues when opening directly in browsers. Blog posts are written in Markdown format with metadata headers.

## Blog Post Structure

Each blog post follows this structure:

```
TITLE: Your Blog Post Title
DATE: YYYY-MM-DD
AUTHOR: Author Name
TAGS: Tag1, Tag2, Tag3, Tag4
IMAGE: path/to/image.jpg (optional)

# Your Markdown Content Starts Here

Your blog post content goes here using standard Markdown formatting...
```

## Metadata Fields

### Required Fields:
- **TITLE**: The title of your blog post
- **DATE**: Publication date in YYYY-MM-DD format (e.g., 2025-01-15)
- **AUTHOR**: Author name
- **TAGS**: Comma-separated list of tags for filtering

### Optional Fields:
- **IMAGE**: Path to a featured image (relative to the blog folder)

## Markdown Formatting Guide

### Headers
```markdown
# Main Title (H1)
## Section Title (H2)
### Subsection Title (H3)
#### Sub-subsection Title (H4)
##### Minor Heading (H5)
###### Smallest Heading (H6)
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
`Inline code`
```

### Lists

#### Unordered Lists:
```markdown
- Item 1
- Item 2
  - Nested item
  - Another nested item
- Item 3
```

#### Ordered Lists:
```markdown
1. First item
2. Second item
   1. Nested numbered item
   2. Another nested item
3. Third item
```

### Links and Images
```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Link Title")

![Alt text](path/to/image.jpg)
![Alt text with title](path/to/image.jpg "Image Title")
```

### Code Blocks

#### Inline Code:
```markdown
Use `console.log()` to print to console.
```

#### Code Blocks with Syntax Highlighting:
````markdown
```javascript
function greet(name) {
    console.log(`Hello, ${name}!`);
}
```

```python
def greet(name):
    print(f"Hello, {name}!")
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
```
````

### Blockquotes
```markdown
> This is a blockquote
> 
> It can span multiple lines
> 
> > Nested blockquotes are also possible
```

### Tables
```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Row 1    | Data     | More     |
| Row 2    | Data     | More     |
```

### Horizontal Rules
```markdown
---
```

## Adding New Blog Posts

Since the current system uses embedded data, follow these steps to add new posts:

### Step 1: Write Your Blog Post
Create your blog post content following the structure above.

### Step 2: Add to blog.js
Open `blog.js` and add your new post to the `blogData` array:

```javascript
{
    filename: 'your-post-slug.txt',
    content: `TITLE: Your Blog Post Title
DATE: 2025-01-15
AUTHOR: Your Name
TAGS: Technology, Programming, Tutorial
IMAGE: blogs/images/your-image.jpg

# Your Blog Post Title

Your markdown content here...`
}
```

### Step 3: Update Filters (Optional)
If you're using new tags, make sure they're included in the filter buttons in `blog.html`.

## Best Practices

### Writing Tips:
1. **Clear Titles**: Use descriptive, SEO-friendly titles
2. **Proper Structure**: Use headers to organize content logically
3. **Code Examples**: Include practical code examples when relevant
4. **Images**: Use relevant images to break up text and illustrate concepts
5. **Tags**: Use consistent, relevant tags for better filtering

### Technical Tips:
1. **Escape Characters**: Use backslashes to escape special markdown characters if needed
2. **Line Breaks**: Use double line breaks for new paragraphs
3. **Code Formatting**: Always specify language for syntax highlighting
4. **Links**: Use descriptive link text, avoid "click here"

## Example Blog Post Template

```markdown
TITLE: Getting Started with AWS Lambda Functions
DATE: 2025-01-15
AUTHOR: Vaishak I Kuppast
TAGS: AWS, Serverless, Lambda, Tutorial
IMAGE: blogs/images/aws-lambda-tutorial.jpg

# Getting Started with AWS Lambda Functions

AWS Lambda is a serverless computing service that lets you run code without provisioning or managing servers. In this tutorial, we'll explore how to create and deploy your first Lambda function.

## What is AWS Lambda?

AWS Lambda is a **serverless compute service** that runs your code in response to events and automatically manages the underlying compute resources for you.

### Key Benefits:
- **No server management**
- **Automatic scaling**
- **Pay-per-request pricing**
- **Built-in fault tolerance**

## Creating Your First Lambda Function

Let's create a simple "Hello World" function:

```python
import json

def lambda_handler(event, context):
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Hello from Lambda!',
            'input': event
        })
    }
```

## Supported Languages for Syntax Highlighting

The blog system supports syntax highlighting for many languages:

- `javascript` / `js`
- `python` / `py`
- `java`
- `cpp` / `c++`
- `csharp` / `c#`
- `php`
- `ruby`
- `go`
- `rust`
- `swift`
- `kotlin`
- `typescript` / `ts`
- `html`
- `css`
- `scss` / `sass`
- `json`
- `xml`
- `yaml` / `yml`
- `sql`
- `bash` / `shell`
- `powershell`
- `dockerfile`
- `markdown` / `md`

## Troubleshooting

### Common Issues:

1. **Metadata not parsing correctly**
   - Ensure there's a blank line after metadata
   - Check for typos in field names
   - Make sure date format is YYYY-MM-DD

2. **Code blocks not highlighting**
   - Specify the language after the opening ```
   - Check that the language is supported

3. **Images not displaying**
   - Verify image path is correct
   - Ensure image file exists
   - Use relative paths from the blog folder

4. **Tags not filtering correctly**
   - Check tag spelling matches filter buttons
   - Tags are case-sensitive

## Future Enhancements

Potential improvements to consider:
- Dynamic file loading system
- Admin interface for adding posts
- Comment system integration
- Search functionality
- RSS feed generation
- SEO optimization features

---

For technical support or questions about the blog system, please refer to the main project documentation or contact the development team.
