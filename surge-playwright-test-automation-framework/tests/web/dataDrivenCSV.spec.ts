import { test } from '../web/fixtures/basePage';
import { expect } from '@playwright/test';
import { WebEnv } from '../../framework-config/web-env';

import fs from 'fs';
import path from 'path';
import {parse} from "csv-parse/sync";

test.describe(`Test Describe`,{
    tag:[`@test`]
},()=> {

    const records = parse(
        fs.readFileSync(path.join(__dirname,"../../testdata/CSV/SIGNUP_USERS.csv")),
        {
            columns:true,
            skip_empty_lines:true,
        }
    )

    for(const record of records){
        test(`Print Employee details ${record.FirstName}`,async({loginPage})=>{
            console.log(record.FirstName);
            console.log(record.LastName);
            console.log(record.Email);
            console.log(record.PhoneNumber);
        })
    }


    
});