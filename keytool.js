const { exec } = require('child_process');

exec('keytool -genkey -v -keystore ./debug.keystore -alias "rn0x" -storepass "11223344" -keypass "11223344" -keyalg RSA -keysize 2048 -dname "CN=rn0x, OU=altaqwaa, O=altaqwaa, L=makkah, ST=makkah, C=sa"', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
});
