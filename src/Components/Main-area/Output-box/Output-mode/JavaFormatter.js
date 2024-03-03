import prettier from 'prettier';
import prettierJava from 'prettier-plugin-java';

function formatJavaCode(javaCode) {
    try {
        return prettier.format(javaCode, {
          parser: 'java',
          plugins: [prettierJava],
          tabWidth: 2,
        });
      } catch (error) {
        console.error('Error formatting Java code:', error);
        return javaCode; // Return the original code in case of an error
      }
    }
  
  export { formatJavaCode }; // Exporting as a named export