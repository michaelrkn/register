# Register To Vote

Built with Next.js.

An example `.env` file is provided in `.env.example`.

Data is submitted to Rock The Vote (RTV) via their [API](https://rock-the-vote.github.io/Voter-Registration-Tool-API-Docs/).

You can modify the behavior of the tool with these query parameters:

* `partnerId`: sets the RTV partner ID (if you have a partner account with RTV).
* `source`: sets the `source_tracking_id` in RTV.
* `hideHeader`: hides the index page header if appropriate for embedding.
* `newIdUx`: if true, provides an improved UX for the print-and-mail ID field.

The tool is deployed to Vercel at https://register-to-vote.vercel.app.

You can embed it in your website with code like this:

```html
<iframe src="https://register-to-vote.vercel.app/"
        style="border-style: none; width: 100%; height: 100%;"
        id="register-to-vote">
</iframe>
```

The tool will emit messages to the parent window on each form submission and on clicking the button to register online.
If you'd like to use these for analytics, you can listen for them like this:

```html
<script>
  window.addEventListener("message", (event) => {
    if (event.origin === "https://register-to-vote.vercel.app") {
      if (event.data === "firstFormSubmitted") {
        // do what you want
      } else if (event.data === "ovrButtonClicked") {
        // do what you want
      } else if (event.data === "mailFormSubmitted") {
        // do what you want
      }
    }
  }, false);
</script>
```
