# CareerPath Backend API

A robust Express.js backend with MongoDB database for the CareerPath application, featuring user authentication, profile management, and roadmap progress tracking.

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **User Management**: Profile creation, updates, and management
- **Roadmap Progress**: Track user progress through different career roadmaps
- **Skill Assessment**: Save and manage assessment results
- **Security**: Input validation, rate limiting, and security headers
- **Database**: MongoDB with Mongoose ODM for flexible data storage

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (v5 or higher)
- **npm** or **yarn**

## 🛠️ Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd roadmap-react-journey-main/backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `config.env` and update the values:
   ```bash
   cp config.env .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/careerpath
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start MongoDB**:
   - **Local MongoDB**: Make sure MongoDB is running on your system
   - **MongoDB Atlas**: Use your cloud MongoDB connection string

5. **Run the application**:
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

## 🗄️ Database Setup

The application will automatically create the necessary collections when you first run it. The main collections are:

- **users**: User accounts and profiles
- **roadmaps**: Career roadmap data (if you add roadmap management)
- **assessments**: Assessment questions and results (if you add assessment management)

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:resetToken` - Reset password

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/skills` - Update user skills
- `POST /api/user/roadmap-progress` - Update roadmap progress
- `POST /api/user/assessment-result` - Save assessment result
- `GET /api/user/roadmap-progress/:roadmapId` - Get specific roadmap progress

### Health Check
- `GET /api/health` - API health status

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/careerpath` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-jwt-key-change-this-in-production` |
| `NODE_ENV` | Environment mode | `development` |

### MongoDB Connection

For local development:
```env
MONGODB_URI=mongodb://localhost:27017/careerpath
```

For MongoDB Atlas:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerpath
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds of 12
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Express-validator for request validation
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Security Headers**: Helmet.js for security headers
- **CORS**: Configured for frontend integration

## 📊 Data Models

### User Schema
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  profilePicture: String,
  bio: String,
  currentRole: String,
  experienceLevel: String,
  interests: [String],
  skills: [{
    name: String,
    level: String,
    progress: Number
  }],
  roadmapProgress: [{
    roadmapId: String,
    roadmapName: String,
    completedSteps: [String],
    currentStep: String,
    progress: Number,
    startedAt: Date,
    lastUpdated: Date
  }],
  assessmentResults: [{
    assessmentId: String,
    assessmentName: String,
    score: Number,
    maxScore: Number,
    completedAt: Date
  }],
  isEmailVerified: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Production Setup

1. **Update environment variables**:
   ```env
   NODE_ENV=production
   JWT_SECRET=your-very-secure-production-secret
   MONGODB_URI=your-production-mongodb-uri
   ```

2. **Install production dependencies**:
   ```bash
   npm install --production
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start server.js --name "careerpath-backend"

# Monitor the application
pm2 monit

# View logs
pm2 logs careerpath-backend
```

## 🧪 Testing

To test the API endpoints, you can use tools like:

- **Postman**
- **Insomnia**
- **cURL**

### Example API Calls

**Signup**:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Password123"
  }'
```

**Login**:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "Password123"
  }'
```

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Port Already in Use**:
   - Change PORT in `.env`
   - Kill existing process: `lsof -ti:5000 | xargs kill -9`

3. **JWT Token Issues**:
   - Ensure JWT_SECRET is set
   - Check token expiration
   - Verify token format in Authorization header

### Logs

Check the console output for detailed error messages and debugging information.

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support and questions, please open an issue in the repository. 