# Bug Report – Swag Labs Functional Testing

## Summary

This document outlines confirmed and potential bugs found during automated and exploratory functional testing of Swag Labs. The goal is to evaluate how reliably core workflows function, identify regressions, and assess the consistency of UI behavior across user roles.


| **Severity**                                            | **Priority**                                  |
|---------------------------------------------------------|-----------------------------------------------|
| Critical: Breaks core functionality or causes data loss | P1: Needs immediate fix before release        |
| High: Blocks a major feature                            | P2: Should be fixed soon, but not blocking    |
| Medium: Affects usability or a key user action          | P3: Can be fixed later or in the next cycle   |
| Low: Minor issue                                        | -                                             |



## Bug 1: "Remove" Button Remains After Item is Removed from Cart
Severity: Medium
Priority: P2

**Steps to Reproduce**  
1. On the All Items page, select a product to view its details.  
2. Click “Add to cart.”  
3. Confirm the cart icon updates with the item count.  
4. Click “Remove” on the product details page.  
5. Use the back button to return to the All Items listing.

**Expected Result**  
- The product’s button should now display “Add to cart.”

**Actual Result**  
- The button still shows “Remove,” even though the item is no longer in the cart.

**Impact**  
- Leads to inconsistent cart state and misleads the user about the actual cart contents.



## Bug 2: User Type–Based Behaviors & Glitches
Severity: High
Priority: P1

| **Username**              | **Behavior**                                                                  |
|---------------------------|-------------------------------------------------------------------------------|
| `standard_user`           | Works as expected                                                             |
| `locked_out_user`         | Displays message: "Epic sadface: Sorry, this user has been locked out."       |
| `problem_user`            | Logs in, but **images do not load** and cart/product UI behaves unpredictably |
| `performance_glitch_user` | Slow page loads; delayed cart updates and add/remove actions                  |


**Expected Result**  
- All users (excluding locked_out_user) should have consistent experiences.

**Actual Result**  
- "problem_user" and "performance_glitch_user" show UI and UX issues.

**Impact**  
- Unstable behavior for certain roles may affect test result accuracy if roles are used interchangeably in test cases.



## Bug 3: Cart Shows Item Count After Removal via Product Page
Severity: Medium
Priority: P2

**Steps to Reproduce**  
1. Add an item to the cart from the All Items page.  
2. Navigate to the product details page.  
3. Remove the item from cart.  
4. Click “Back” to return to All Items.

**Expected Result**  
- Cart icon should reset to 0.  
- Button under item should say “Add to cart.”

**Actual Result**  
- Cart icon still shows 1 item.  
- Button still says “Remove.”

**Impact**  
- Indicates that removing an item from the product page does not properly update cart state in all views.


## Bug 4: "Reset App State" Does Not Reset Cart or UI
Severity: High
Priority: P1

**Steps to Reproduce**  
1. Add an item to the cart.  
2. Open the sidebar menu.  
3. Click "Reset App State."

**Expected Result**  
- Cart count should reset.  
- All item buttons should be reset to “Add to cart.”  
- User state should return to default.

**Actual Result**  
- No changes occur. Cart still contains items. Buttons remain in their current state.

**Impact**  
- This feature is expected to help clean the session during testing or navigation. Its failure impacts test data reliability and repeatable testing.


## Testing Adjustments Made Due to These Issues

- Added extra assertions in tests to make sure the cart and button labels update correctly after actions like adding or removing items.
- Avoided using the "Reset App State" option because it doesn’t always work. Instead, tests log in again to reset the session.
- Skipped automation for user types like problem_user and performance_glitch_user since they show inconsistent behavior.
- In areas where bugs may affect the test, added steps like refreshing the page or using soft checks so tests don’t fail unexpectedly.


## Additional Potential Bugs (Not Fully Documented)

These are bugs observed during exploratory testing but not fully validated or covered by automation.

- Image mismatch and missing assets for problem_user:
    Product images do not load correctly on the All Items listing page.
    Some product images appear broken or mismatched.
- High latency with performance_glitch_user:
    Page load times are significantly delayed across the site.
    Cart updates (Add/Remove) feel unresponsive.
- Sorting filter not persisting state between refreshes.
- Footer links to Twitter, Facebook, LinkedIn  are broken or unresponsive.
- "Reset App State" button in menu appears non-functional.
- Empty checkout allowed when required fields are skipped (covered in automated tests).
- No quantity selector:
    Users cannot add more than one unit of the same product — there is no quantity adjustment control.  
- "Remove" button persists after logout and login:
    Products added in a previous session show "Remove" instead of "Add to cart" despite the cart being empty.

