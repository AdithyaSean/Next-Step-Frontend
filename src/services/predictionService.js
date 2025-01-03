const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Get career predictions for a student profile
 * @param {Object} profileData - Student profile data
 * @param {number} profileData.education_level - Education level (0: OL, 1: AL, 2: UNI)
 * @param {Array} profileData.ol_results - Array of O/L results with subject codes and grades
 * @param {number} profileData.al_stream - A/L stream code
 * @param {Array} profileData.al_results - Array of A/L results with subject codes and grades
 * @param {number} profileData.z_score - Z-score value
 * @param {number} profileData.gpa - University GPA (optional)
 * @returns {Promise<Array>} Array of career predictions with probabilities
 */
export const getPredictions = async (profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/predictions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get predictions');
    }

    return await response.json();
  } catch (error) {
    console.error('Prediction service error:', error);
    throw error;
  }
};

/**
 * Save student profile data
 * @param {string} userId - Firebase user ID
 * @param {Object} profileData - Complete profile data including predictions
 */
export const saveProfile = async (userId, profileData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profiles/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to save profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Profile save error:', error);
    throw error;
  }
};
