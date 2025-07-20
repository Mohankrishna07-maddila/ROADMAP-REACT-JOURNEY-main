const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/user/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: user.getProfile()
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
});

// @route   PUT /api/user/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Bio cannot exceed 500 characters'),
  body('currentRole')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Current role cannot exceed 100 characters'),
  body('experienceLevel')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
    .withMessage('Invalid experience level'),
  body('interests')
    .optional()
    .isArray()
    .withMessage('Interests must be an array')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { firstName, lastName, bio, currentRole, experienceLevel, interests } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (bio !== undefined) user.bio = bio;
    if (currentRole !== undefined) user.currentRole = currentRole;
    if (experienceLevel) user.experienceLevel = experienceLevel;
    if (interests) user.interests = interests;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: user.getProfile()
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
});

// @route   POST /api/user/skills
// @desc    Add or update user skills
// @access  Private
router.post('/skills', protect, [
  body('skills')
    .isArray()
    .withMessage('Skills must be an array'),
  body('skills.*.name')
    .notEmpty()
    .withMessage('Skill name is required'),
  body('skills.*.level')
    .optional()
    .isIn(['beginner', 'intermediate', 'advanced', 'expert'])
    .withMessage('Invalid skill level'),
  body('skills.*.progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { skills } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update or add skills
    skills.forEach(newSkill => {
      const existingSkillIndex = user.skills.findIndex(skill => skill.name === newSkill.name);
      
      if (existingSkillIndex !== -1) {
        // Update existing skill
        user.skills[existingSkillIndex] = {
          ...user.skills[existingSkillIndex],
          ...newSkill
        };
      } else {
        // Add new skill
        user.skills.push({
          name: newSkill.name,
          level: newSkill.level || 'beginner',
          progress: newSkill.progress || 0
        });
      }
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Skills updated successfully',
      skills: user.skills
    });
  } catch (error) {
    console.error('Update skills error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating skills'
    });
  }
});

// @route   POST /api/user/roadmap-progress
// @desc    Update roadmap progress
// @access  Private
router.post('/roadmap-progress', protect, [
  body('roadmapId')
    .notEmpty()
    .withMessage('Roadmap ID is required'),
  body('roadmapName')
    .notEmpty()
    .withMessage('Roadmap name is required'),
  body('completedSteps')
    .optional()
    .isArray()
    .withMessage('Completed steps must be an array'),
  body('currentStep')
    .optional()
    .isString()
    .withMessage('Current step must be a string'),
  body('progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { roadmapId, roadmapName, completedSteps, currentStep, progress } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Find existing roadmap progress
    const existingRoadmapIndex = user.roadmapProgress.findIndex(
      roadmap => roadmap.roadmapId === roadmapId
    );

    if (existingRoadmapIndex !== -1) {
      // Update existing roadmap progress
      user.roadmapProgress[existingRoadmapIndex] = {
        ...user.roadmapProgress[existingRoadmapIndex],
        roadmapName,
        completedSteps: completedSteps || user.roadmapProgress[existingRoadmapIndex].completedSteps,
        currentStep: currentStep || user.roadmapProgress[existingRoadmapIndex].currentStep,
        progress: progress !== undefined ? progress : user.roadmapProgress[existingRoadmapIndex].progress,
        lastUpdated: new Date()
      };
    } else {
      // Add new roadmap progress
      user.roadmapProgress.push({
        roadmapId,
        roadmapName,
        completedSteps: completedSteps || [],
        currentStep: currentStep || '',
        progress: progress || 0,
        startedAt: new Date(),
        lastUpdated: new Date()
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Roadmap progress updated successfully',
      roadmapProgress: user.roadmapProgress
    });
  } catch (error) {
    console.error('Update roadmap progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating roadmap progress'
    });
  }
});

// @route   POST /api/user/assessment-result
// @desc    Save assessment result
// @access  Private
router.post('/assessment-result', protect, [
  body('assessmentId')
    .notEmpty()
    .withMessage('Assessment ID is required'),
  body('assessmentName')
    .notEmpty()
    .withMessage('Assessment name is required'),
  body('score')
    .isInt({ min: 0 })
    .withMessage('Score must be a positive number'),
  body('maxScore')
    .isInt({ min: 1 })
    .withMessage('Max score must be a positive number')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { assessmentId, assessmentName, score, maxScore } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add assessment result
    user.assessmentResults.push({
      assessmentId,
      assessmentName,
      score,
      maxScore,
      completedAt: new Date()
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Assessment result saved successfully',
      assessmentResults: user.assessmentResults
    });
  } catch (error) {
    console.error('Save assessment result error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving assessment result'
    });
  }
});

// @route   GET /api/user/roadmap-progress/:roadmapId
// @desc    Get specific roadmap progress
// @access  Private
router.get('/roadmap-progress/:roadmapId', protect, async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const roadmapProgress = user.roadmapProgress.find(
      roadmap => roadmap.roadmapId === roadmapId
    );

    if (!roadmapProgress) {
      return res.status(404).json({
        success: false,
        message: 'Roadmap progress not found'
      });
    }

    res.status(200).json({
      success: true,
      roadmapProgress
    });
  } catch (error) {
    console.error('Get roadmap progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching roadmap progress'
    });
  }
});

module.exports = router; 