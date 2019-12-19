Using to test component lazy loading using web-pack dynamic import.

I. Test guide
1. Modify 'src/testChunk/App.vue', added your target components to test
2. Execute 'npm run test-chunk' command. When vue-cli build process completed, http-server will be run, hosted app's addr will be shown in terminal window.
3. Access this addr, test your components, ensure chunk files is loaded lazily. 
