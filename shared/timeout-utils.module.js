// ES6 module version for background service worker
// Import this file in ES6 modules

/**
 * Calculate auto-adjusted timeout based on authenticated user count
 * @param {number} totalAuthenticatedCount - Total number of authenticated users
 * @returns {number} Timeout duration in milliseconds
 */
export function calculateAutoTimeout(totalAuthenticatedCount) {
    if (!totalAuthenticatedCount) {
        return null;
    }

    let timeoutMinutes;

    if (totalAuthenticatedCount < 1000) {
        timeoutMinutes = 1;
    } else if (totalAuthenticatedCount < 5000) {
        timeoutMinutes = 1.5;
    } else if (totalAuthenticatedCount < 15000) {
        timeoutMinutes = 2;
    } else {
        timeoutMinutes = 2 + Math.floor((totalAuthenticatedCount - 15000) / 5000) * 0.167;
    }

    return timeoutMinutes * 60000;
}

/**
 * Calculate auto-adjusted request interval based on authenticated user count
 * @param {number} totalAuthenticatedCount - Total number of authenticated users
 * @returns {number} Request interval in milliseconds
 */
export function calculateAutoRequestInterval(totalAuthenticatedCount) {
    if (!totalAuthenticatedCount) {
        return null; // Caller should use default
    }

    // Tiered request interval:
    // <1000 users: 5 seconds
    // <5000 users: 2 seconds
    // 5000+ users: 1 second
    if (totalAuthenticatedCount < 1000) return 5000;
    if (totalAuthenticatedCount < 5000) return 2000;
    return 1000;
}
