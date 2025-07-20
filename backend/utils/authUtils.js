const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d'
  });
};

// Generate random token for email verification and password reset
const generateRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Hash random token
const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Send token response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = generateToken(user._id);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      currentRole: user.currentRole,
      experienceLevel: user.experienceLevel,
      interests: user.interests,
      skills: user.skills,
      roadmapProgress: user.roadmapProgress,
      assessmentResults: user.assessmentResults,
      isEmailVerified: user.isEmailVerified,
      lastLogin: user.lastLogin,
      createdAt: user.createdAt
    }
  });
};

// Create and send cookie token
const sendCookieToken = (user, statusCode, res) => {
  const token = generateToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  // Remove password from output
  user.password = undefined;

  res.status(statusCode)
    .cookie('token', token, cookieOptions)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
        bio: user.bio,
        currentRole: user.currentRole,
        experienceLevel: user.experienceLevel,
        interests: user.interests,
        skills: user.skills,
        roadmapProgress: user.roadmapProgress,
        assessmentResults: user.assessmentResults,
        isEmailVerified: user.isEmailVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    });
};

module.exports = {
  generateToken,
  generateRandomToken,
  hashToken,
  sendTokenResponse,
  sendCookieToken
}; 