import {assert} from "chai"
import generateScreenshot, {startupBrowser} from "./generateScreenshot";

describe("generateScreenshot Test Suite", () => {
    it("should generate a guest screenshot", async () => {
        await startupBrowser();
        await generateScreenshot({
            name: "John Doe",
            date: "2020-01-01",
            type: "guest"
        });
        assert.isTrue(true)
    })
    it("should generate a student screenshot", async () => {
        await startupBrowser();
        await generateScreenshot({
            name: "John Doe",
            date: "2020-01-01",
            type: "student"
        });
        assert.isTrue(true)
    })
    it("should generate a employee screenshot", async () => {
        await startupBrowser();
        await generateScreenshot({
            name: "John Doe",
            date: "2020-01-01",
            type: "employee"
        });
        assert.isTrue(true)
    })
    it("should generate a guest screenshot on an iPhone 6", async () => {
        await startupBrowser();
        await generateScreenshot({
            name: "John Doe",
            date: "2020-01-01",
            type: "guest",
            device: "iPhone 6"
        });
        assert.isTrue(true)
    })
})