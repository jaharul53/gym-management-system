# Gym-Management-System

## Project Overview
The ***Gym Management System** is a web application designed to streamline gym operations, including trainer scheduling, trainee bookings, and profile management. This backend application uses **Node.js, Express.js, and MongoDB** with **JWT authentication** for secure access.
## Relation Diagram
![Blank diagram](https://github.com/user-attachments/assets/5f1640b6-5747-4006-9913-fe6a43db0b59)
## Live Hosting Link
**Live Server:** https://gym-management-system-1-6ejh.onrender.com/
## Technology Stack
**Backend Framework:** Node.js, Express.js

**Database:** MongoDB (Mongoose ORM)

**Authentication:** JSON Web Tokens (JWT)

**Hosting:** Render

## API Endpoints
### Admin APIs
|        Endpoint        |       Method      | Description      |                                                Body/Params                                                    |
|------------------------|-------------------|------------------|---------------------------------------------------------------------------------------------------------------|
|   /api/admin/login        |  POST  |  Admin Login  |  { "email": "dev.johurulislam@gmail.com", "password": "Johurul123" }  |
|   /api/admin/create-trainer |  POST |  Create Trainer  |  POST	{ "name": "Sohag2", "email": "s2@gmail.com" }  |
|  /api/admin/schedule-class  |  POST |  Schedule Class	 |  { "date": "2024-12-15", "time": "12:00 AM", "trainerId": "dbtrainerId" }  |

### Trainer APIs
|        Endpoint        |       Method      | Description      |                                                Body/Params                                                    |
|------------------------|-------------------|------------------|---------------------------------------------------------------------------------------------------------------|
|  /api/trainer/schedules/:trainerId  |	GET	 |  Fetch Trainer Schedules  |	Trainer ID in URL (:trainerId)  |

### Trainee APIs
|        Endpoint        |       Method      | Description      |                                                Body/Params                                                    |
|------------------------|-------------------|------------------|---------------------------------------------------------------------------------------------------------------|
|  /api/trainee/signup  |	POST	|  Create Trainee Profile  |	{ "name": "John", "email": "john@gmail.com", "password": "123456" }  |
|  /api/trainee/login	|  POST	|  Trainee Login  |	{ "email": "john@gmail.com", "password": "123456" }  |
|  /api/trainee/book-class  |	POST  |	Book a Class  |	 { "classId": "dbclassId", "traineeId": "dbtraineeId" }  |
|  /api/trainee/update-trainee	|  PUT  |	Update Profile  |	{ "traineeId": "dbtraineeId", "name": "John Doe", "email": "john.doe@gmail.com" }  |
|  /api/trainee/getClasses/:traineeId	|  GET  |	Fetch Trainee Classes |	Trainee ID in URL (:traineeId)  |

## Database Schema
#### Admin
```markdown
{
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}
);
```


### Trainer
```markdown
{
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
}
```
## Trainee
```
{
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }]
}
```
### Class

```
{
    date: { type: Date, required: true },
    time: { type: String, required: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', required: true },
    trainees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trainee' }],
    maxTrainees: { type: Number, default: 10 }
}
```
## Instructions to Run Locally
#### 1. Clone the repository:
```
git clone https://github.com/yourusername/gym-management-system.git
cd gym-management-system
```
#### 2. Install dependencies:
```
npm install
```
#### 3. Create a .env file:
```
ADMIN_EMAIL=dev.johurulislam@gmail.com
ADMIN_PASS=Johurul123
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string
```
#### 4. Start the server:
```
npm start
```
#### 5. Access the APIs:

#### Base URL: http://localhost:3000


## Testing Instructions

### Admin Credentials

**Email:** dev.johurulislam@gmail.com

**Password:** Johurul123

### Test Key Features

**Login as Admin:** Use /api/admin/login.

**Create Trainer:** Use /api/admin/create-trainer.

**Schedule a Class:** Use /api/admin/schedule-class.

**Trainee Signup:** Use /api/trainee/signup.

**Trainee Login:** Use /api/trainee/login.

**Book a Class:** Use /api/trainee/book-class.

**Fetch Trainer Schedule:** Use /api/trainer/schedules/:trainerId.

**Fetch Trainee Classes:** Use /api/trainee/getClasses/:traineeId.




