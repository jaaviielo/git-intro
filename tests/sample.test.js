import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("TodoMVC Sample Test", () => {
  it("should create a new todo item and complete it", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://todomvc.com/examples/react/dist/" });

    const input = await testdriver.find("What needs to be done? input field");
    await input.click();
    await testdriver.type("Buy groceries");
    await testdriver.pressKeys(["Enter"]);

    const assertAdded = await testdriver.assert("'Buy groceries' is visible in the todo list");
    expect(assertAdded).toBeTruthy();

    const checkbox = await testdriver.find("circular toggle checkbox next to 'Buy groceries'");
    await checkbox.click();

    const assertCompleted = await testdriver.assert("the todo item is marked completed and 0 items left is displayed");
    expect(assertCompleted).toBeTruthy();
  });
});
