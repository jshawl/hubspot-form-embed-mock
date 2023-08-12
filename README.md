# HubSpot Form Embed Mock

This project implements the
[HubSpot Forms Embed API](https://legacydocs.hubspot.com/docs/methods/forms/advanced_form_options)
without making any network requests in order to facilitate testing in
development and test environments.

## Usage

Replace your existing HubSpot embed `script`

```html
<script
  charset="utf-8"
  defer="true"
  type="text/javascript"
  src="https://js.hsforms.net/forms/embed/v2.js">
</script>
```

with a link to this package:

```html
<script
  charset="utf-8"
  defer="true"
  type="text/javascript"
  src="https://unpkg.com/hubspot-form-embed-mock/dist/index.js">
</script>
```
