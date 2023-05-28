## API Documentation

This documentation provides an overview of the REST API implemented in the provided code. The API allows creating, retrieving, updating, and deleting events. The events are stored in a JSON file located at `data/comments/events.json`. The API endpoints follow a versioning convention and are accessible under the `/api/v3/app/events` path.

### Base URL

```
http://localhost:3000
```

### Endpoints

#Create Event

```
POST /api/v3/app/events
```

Creates a new event.

##### Request Body

| Field       | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| name        | string | The name of the event                 |
| tagline     | string | The tagline or short description      |
| schedule    | string | The schedule or date of the event     |
| description | string | The detailed description of the event |
| moderator   | string | The name of the event moderator       |
| category    | string | The category of the event             |
| subCategory | string | The sub-category of the event         |
| rigorRank   | string | The rank or level of rigor            |

##### Response

- 200 OK: Event created successfully

  - `id`: The unique identifier of the created event
  - `message`: Success message

- 500 Internal Server Error: Error saving event data
  - `message`: Error message

#### Retrieve Event

```
GET /api/v3/app/events/:id
```

Retrieves an event with the specified ID.

##### Parameters

| Parameter | Type   | Description         |
| --------- | ------ | ------------------- |
| id        | string | The unique event ID |

##### Response

- 200 OK: Event found

  - Returns the event object as JSON

- 404 Not Found: Event not found

  - `message`: Error message

- 500 Internal Server Error: Error retrieving event data
  - `message`: Error message

#### Retrieve Paginated Events

```
GET /api/v3/app/events
```

Retrieves a list of paginated events.

##### Query Parameters

| Parameter | Type   | Default | Description                           |
| --------- | ------ | ------- | ------------------------------------- |
| page      | number | 1       | The page number for pagination        |
| limit     | number | 10      | The maximum number of events per page |

##### Response

- 200 OK: Events retrieved successfully

  - Returns an array of paginated events as JSON

- 500 Internal Server Error: Error retrieving events data
  - `message`: Error message

#### Update Event

```
PUT /api/v3/app/events/:id
```

Updates an existing event with the specified ID.

##### Parameters

| Parameter | Type   | Description         |
| --------- | ------ | ------------------- |
| id        | string | The unique event ID |

##### Request Body

| Field       | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| name        | string | The updated name of the event         |
| tagline     | string | The updated tagline or description    |
| schedule    | string | The updated schedule or date of event |
| description | string | The updated detailed description      |
| moderator   | string | The updated name of the moderator     |
| category    | string | The updated category of the event     |
| subCategory | string | The updated sub-category of the event |
| rigorRank   | string | The updated rank or level of rigor    |

##### Response

- 200 OK: Event updated successfully

  - `message`: Success message

- 404

Not Found: Event not found

- `message`: Error message

- 500 Internal Server Error: Error updating event
  - `message`: Error message

#### Delete Event

```
DELETE /api/v3/app/events/:id
```

Deletes an event with the specified ID.

##### Parameters

| Parameter | Type   | Description         |
| --------- | ------ | ------------------- |
| id        | string | The unique event ID |

##### Response

- 200 OK: Event deleted successfully

  - `message`: Success message

- 404 Not Found: Event not found

  - `message`: Error message

- 500 Internal Server Error: Error deleting event
  - `message`: Error message

### Error Responses

The API may return the following error responses:

- 404 Not Found: The requested resource or endpoint does not exist.
- 500 Internal Server Error: An internal server error occurred.

Please note that all responses will be in JSON format.

### Running the API Server

To run the API server, execute the following command:

```
node <filename.js>
```

Replace `<filename.js>` with the name of the file containing the provided code.

The API server will start listening on `http://localhost:3000`.
