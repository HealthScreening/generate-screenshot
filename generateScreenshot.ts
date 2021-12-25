/**
 * Copyright (C) 2021 PythonCoderAS
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import {Browser, devices, Page} from "puppeteer";
import * as Buffer from "buffer";
import objectToWrapper  from "@healthscreening/object-to-wrapper";
import { resolve } from "path";
import {screeningValueType} from "@healthscreening/screening-types";

/* eslint-disable @typescript-eslint/no-var-requires -- Really hates it if I don't do this */
const puppeteer = require("puppeteer");
/* eslint-enable @typescript-eslint/no-var-requires */

export let browser: Browser | null = null;

export async function startupBrowser(options?: object): Promise<void> {
    if (browser === null) {
        browser = await puppeteer.launch({
            headless: true,
            ...options,
        });
    }
}

export async function closeBrowser(): Promise<void> {
    if (browser !== null) {
        await browser.close();
        browser = null;
    }
}

export interface GetScreenshotParams {
    name: string;
    date: string;
    type: screeningValueType;
    device?: string;
}

const baseURL = "file://" + resolve(require.resolve("@healthscreening/success-screening-clone"), "..", "page.html") + "?"

async function closePage(page: Page){
    try {
        await page.close();
    } catch (e: any) {
        if (e.message && e.message === "Protocol error: Connection closed. Most likely the page has been closed."){
            // Ignore
        } else {
            throw e;
        }
    }
}

export default async function generateScreenshot(
    options: GetScreenshotParams
): Promise<Buffer> {
    const page = await browser!.newPage();
    try {
        await page.emulate(devices[options.device || "iPhone 11"]);
        await page.goto(baseURL + new URLSearchParams(objectToWrapper(options)).toString());
        await page.evaluate(() => {
            window.scrollBy(0, -10000);
        });
        return (await page.screenshot()) as Buffer;
    } finally {
        await closePage(page)
    }
}
