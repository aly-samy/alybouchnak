import { secureCompare } from '../netlify/functions/utils/security';

function test() {
    const secret = 'my-secret';
    const other = 'other-secret';

    console.log('Testing secureCompare...');

    const pass1 = secureCompare(secret, secret);
    console.log(`Matching strings: ${pass1 ? 'PASS' : 'FAIL'}`);

    const pass2 = !secureCompare(secret, other);
    console.log(`Different strings: ${pass2 ? 'PASS' : 'FAIL'}`);

    const pass3 = !secureCompare(secret, 'my-secre');
    console.log(`Prefix strings: ${pass3 ? 'PASS' : 'FAIL'}`);

    const pass4 = !secureCompare(secret, secret + 't');
    console.log(`Suffix strings: ${pass4 ? 'PASS' : 'FAIL'}`);

    const pass5 = !secureCompare(secret, (null as any));
    console.log(`Null input: ${pass5 ? 'PASS' : 'FAIL'}`);

    if (pass1 && pass2 && pass3 && pass4 && pass5) {
        console.log('ALL TESTS PASSED');
        process.exit(0);
    } else {
        console.log('SOME TESTS FAILED');
        process.exit(1);
    }
}

test();
