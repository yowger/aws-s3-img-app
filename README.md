## Create Post
Creates a post based on the provided parameters, including an image.

### Authentication
Requires a valid token in the Authorization header.

### URL
`POST /api/post`

### Request Form Data
| Parameter   | Type   | Description                            | Requirement Type |
|-------------|--------|----------------------------------------|------------------|
| title       | string | Title of the post being created.       | Required         |
| description | string | Description of the post being created. | Optional         |
| image       | file   | Image file of the post being created.  | Required         |
| author      | string | Author of the post being created.      | Required         |

### _Example Request_
```javascript
let formData = new FormData();
formData.append("title", "My Post Title");
formData.append("description", "My Post Description");
formData.append("image", fileInputElement.files[0]);
formData.append("author", "John doe");

fetch(`http://localhost:8000/api/post`, {
    headers: {
        Authorization: 'Bearer your_token_here'
    },
    method: 'POST',
    body: formData
}).then(response => response.json())
  .then(json => ...);
```

### Response Parameters
| Parameter  | Type   | Description                        |
|------------|--------|------------------------------------|
| _id        | integer| ID of the post that was created.   |
| description| string | Description of the post.           |
| imageName  | string | Name of the image attached to post.|
| createdAt  | string | Date and time when post was created.|
| updatedAt  | string | Date and time when post was last updated.|

### _Example Response_
```json
{
    "_id": 1,
    "description": "My Post Description",
    "imageName": "example.jpg",
    "createdAt": "2022-01-01T12:00:00Z",
    "updatedAt": "2022-01-01T12:00:00Z"
}
```

***
