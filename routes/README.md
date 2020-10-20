# unique-email-api

A simple API server to count number of unique emails.

## Setup

  *  Clone this repository
  *  Install dependencies `npm install`
  *  Start the server `npm start`

## API

The API consists of a single endpoint which receives data when a user would like to count the number of unique emails in a list.

### Add Usage

  *  **method**: POST
  *  **endpoint**: /api/emails/unique
  *  **data**: JSON object
  *  **result**: JSON object containing the uniqueEmailAddressCount, HTTP status 200, 400, 500

#### Example

**Data**
````
{
    "emails": ["test.email@gmail.com", "test.email+spam@gmail.com", "foobar@gmail.com", "langeljonathon@gmail.com"]
}
````

**Request**

     curl -X POST -H "Content-Type: application/json" --data '{
    "emails": ["test.email@gmail.com", "test.email+spam@gmail.com", "foobar@gmail.com", "langeljonathon@gmail.com"]}' http://localhost:4000/api/emails/unique

**Response**
````
{
    "uniqueEmailAddressCount": 3
}
````