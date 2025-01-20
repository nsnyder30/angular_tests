import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

console.log('Loading latest version of src/test.ts');
console.log('Test environment initialized');
getTestBed().initTestEnvironment(
	BrowserDynamicTestingModule,
	platformBrowserDynamicTesting()
);

const context = require.context('./', true, /\.spec\.ts$/);

context.keys().forEach(context);
