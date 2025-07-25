import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

export default function SocialAuthButtons({ isSignup = false }) {
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google sign-in error: ", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await signInWithFacebook();
    } catch (error) {
      console.error("Facebook sign-in error: ", error);
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <motion.button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center w-full py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 transition"
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">{/* Google SVG Path */}</svg>
        <span className="text-sm font-medium">
          {isSignup ? 'Sign up' : 'Sign in'} with Google
        </span>
      </motion.button>

      <motion.button
        onClick={handleFacebookSignIn}
        className="flex items-center justify-center w-full py-2 bg-blue-600 border border-transparent rounded-lg shadow-sm text-white hover:bg-blue-700 transition"
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.98 }}
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">{/* Facebook SVG Path */}</svg>
        <span className="text-sm font-medium">
          {isSignup ? 'Sign up' : 'Sign in'} with Facebook
        </span>
      </motion.button>
    </div>
  );
}
