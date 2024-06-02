## Create Post

Creates a post based on the provided parameters, including an image.

### Authentication

Requires a valid token in the Authorization header.

### URL

`POST /api/post`

### Request Form Data

| Parameter   | Type   | Description                            | Requirement Type |
| ----------- | ------ | -------------------------------------- | ---------------- |
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

| Parameter   | Type    | Description                               |
| ----------- | ------- | ----------------------------------------- |
| \_id        | integer | ID of the post that was created.          |
| description | string  | Description of the post.                  |
| imageName   | string  | Name of the image attached to post.       |
| createdAt   | string  | Date and time when post was created.      |
| updatedAt   | string  | Date and time when post was last updated. |

### Success Responses

-   **Status Code:** 201 Created
-   **Response Body:**
    ```json
    {
        "_id": 1,
        "title": "My Post title",
        "description": "My Post Description",
        "imageName": "example.jpg",
        "author": "John doe",
        "createdAt": "2025-01-01T12:00:00Z",
        "updatedAt": "2025-01-01T12:00:00Z"
    }
    ```

### Error Responses

#### Missing Required Fields

-   **Status Code:** 400 Bad Request
-   **Response Body:**
    ```json
    {
        "error": "Missing required fields. Please provide all required fields: title, description, and image."
    }
    ```

#### Invalid File Type

-   **Status Code:** 400 Bad Request
-   **Response Body:**
    ```json
    {
        "error": "Invalid file type. Only jpeg, png, and webp are allowed."
    }
    ```

#### Authorization Token Missing or Invalid

-   **Status Code:** 401 Unauthorized
-   **Response Body:**
    ```json
    {
        "error": "Unauthorized. Please provide a valid authorization token."
    }
    ```

#### Internal Server Error

-   **Status Code:** 500 Internal Server Error
-   **Response Body:**
    ```json
    {
        "error": "Internal server error. Please try again later."
    }
    ```

---
