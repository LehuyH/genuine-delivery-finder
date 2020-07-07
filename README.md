# Genuine Delivery Finder

Find delivery slots in many different services WIP.

## Routing:

There is a `const router` on the global scope. 

### Get a view's name:

Look for the `data-name` attribute value:

The following would have the name 'coolVIEW':
```html
<div class="is-view" data-name="coolVIEW">...</div>
```

### Go to a view
```js
router.go("VIEW NAME");
```

### Set up an onshow event for a specific view:
```js
router.onShow["VIEW NAME"] = () => { /* function body */ }
```

### That's it for the router.