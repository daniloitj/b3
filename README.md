# B3 Playground System

The B3 Playground System is a robust platform designed to interact with financial data from the B3 Stock Exchange. 

I divided the project into two fronts, very inspired by CQRS. 

1- data population. 

a) Option 1: - use the ORM used in the framework. 

- Blocking was that it does not accept bulk. 

b) Option 2 (chosen): 

- use direct connection to Mongo. 

b.1) read file and send. (Very slow) 

b.2) Play in a queue and process (Very slow). 

b.3) Use batch operation, calibrating the machine's memory. (chosen) 

b.4) Batch merge with queue (unnecessary complexity for POC)

2- Data Acquisition:

To query data, I used the ORM available in the framework used. Could have inserted into another table during the data loading process, optimizing the query and following CQRS

## Data Upload

I divided the project into two fronts, very inspired by CQRS.


- **Bulk Uploads:** Currently, bulk upload is not available in this framework.
- **Asynchronous Batching:** Utilize a queue to break the data into asynchronous batches (local machine limit is 5).


## Development

Follow these steps to set up the project locally:

### Initial Setup

1. **Clone the Repository:**

2. **Navigate to your project directory:**

3. **In the assets folder, we have the files in .zip format, which will need to be extracted.**

4. **Environment Variables:**
- Copy the example environment file:
  ```
  cp .env.example .env
  ```
- Set the `DATABASE_URI` in the `.env` file to your MongoDB URI.

5. **Docker Compose (Optional):**
- If you're using local MongoDB, start the service:
  ```
  docker-compose up -d

  in .env exemple set

  DATABASE_URI=mongodb://root:test@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false
  ```

### Project Dependencies

1. **Install Dependencies:**

  ```
  yarn
  ```

2. **Seed the Database:**
- Run the following command to seed initial data into the database:
  ```
  yarn seed
  ```
- The seed script creates your first admin user with the following credentials:
  - Email: dev@teste.com
  - Password: test

3. **Start the Development Server:**

4. **Access the Admin Panel:**
- Open your browser and navigate to:
  ```
  http://localhost:3000/admin
  ```

## Testing

Run the following command to execute tests:




## Endpoints

The system provides two endpoints to access stock information:

1. **Get Maximum Range Value:**
   - URL: `http://localhost:3000/api/stocks/:stock/max-range-value`
   - Method: `GET`

2. **Get Maximum Daily Volume:**
   - URL: `http://localhost:3000/api/stocks/:stock/max-daily-volume`
   - Method: `GET`

## Additional Notes

- **Yarn Seed:** The `yarn seed` command is used to populate the database with initial data. It's essential for setting up the first admin user and basic data structures.


## Doc API

The system also includes a Doc API that provides detailed documentation for various functionalities. To access the Doc API, follow these steps:

Start the Development Server:

- **Access the Doc API:

- **Open your browser and navigate to:

```
http://localhost:3000/api-docs
```



