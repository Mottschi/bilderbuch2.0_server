/**
 * Email validation helper
 * @param {String} email 
 * @returns 
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  
    return emailRegex.test(email) ? true : false;
}
  
export default {isValidEmail};