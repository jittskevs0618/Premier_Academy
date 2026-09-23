# Content Editor Setup

The site has a web-based content editor at **`/admin/`** — for example
`https://premier-academy-flame.vercel.app/admin/`. Whoever edits content there
does not need to know code, GitHub, or anything about how the site is built.

It's [Decap CMS](https://decapcms.org/) (free, open source), pointed at this
GitHub repo. Saving a change in the editor commits it to GitHub, and Vercel
rebuilds and redeploys the live site automatically — usually within a minute.

**One setup step needs a human with access to the `jittskevs0618` GitHub
account**, because GitHub does not let this be done by an API call — it's a
short web form. Everything else here is already done.

---

## The one manual step: create a GitHub OAuth App

This lets the editor log into `/admin/` with their GitHub account instead of
a separate password. It takes about two minutes.

1. Go to **[github.com/settings/applications/new](https://github.com/settings/applications/new)**
   (sign in as `jittskevs0618` first if asked).
2. Fill in exactly:

   | Field | Value |
   |---|---|
   | Application name | `Premier Academy CMS` |
   | Homepage URL | `https://premier-academy-flame.vercel.app` |
   | Authorization callback URL | `https://premier-academy-flame.vercel.app/api/callback` |

3. Click **Register application**.
4. On the page that appears, copy the **Client ID**.
5. Click **Generate a new client secret**, and copy that too — it's shown
   only once.

### Add a second callback URL for later

Once `premier-academy.com` is pointed at this deployment (see the main
[README](README.md#deploying)), come back to this same OAuth App's settings
and click **Add callback URL**, adding:

```
https://premier-academy.com/api/callback
```

This lets the editor log in from either address. Nothing else needs to
change — `/api/auth` and `/api/callback` work out the correct address
automatically from whichever domain the editor is visiting.

---

## Add the two values to Vercel

1. Open the project on [vercel.com](https://vercel.com) → **Settings** →
   **Environment Variables**.
2. Add:

   | Name | Value |
   |---|---|
   | `GITHUB_OAUTH_CLIENT_ID` | the Client ID from step 4 above |
   | `GITHUB_OAUTH_CLIENT_SECRET` | the client secret from step 5 above |

3. Apply to all environments (Production, Preview, Development) unless you
   have a reason not to.
4. Redeploy — Vercel → **Deployments** → the latest one → **⋯** →
   **Redeploy** — so the functions pick up the new variables.

That's it. `/admin/` now shows a working **"Login with GitHub"** button.

---

## Who can log in

Decap's GitHub backend checks that the logged-in GitHub account has **write
access to the `jittskevs0618/Premier_Academy` repository** — the same
permission needed to push code. To let someone else edit content:

1. GitHub → the repo → **Settings** → **Collaborators** → **Add people**.
2. Invite them by their GitHub username or email; they accept the invite.
3. They can now sign into `/admin/` with their own GitHub account.

Consider adding them as a collaborator without also handing them any local
`git` access — the CMS is the only thing they need to touch.

---

## What the editor can and can't do

**Can:** change any wording, sentence, or paragraph on the site; swap or
upload new photos (drag-and-drop, right in the editor); add or remove rows in
lists — teachers, testimonials, honor roll, partners, gallery photos, honor
roll, FAQ questions; update the phone number, address, hours, and social
links in one place (**Site Settings**); update the contact form's email
endpoint.

**Can't**, without a developer: add a genuinely new page, change the layout
or design, or add a new *kind* of content block that doesn't already exist
somewhere on the site. That's a deliberate scope choice — see
[README.md § How this repo is laid out](README.md#how-this-repo-is-laid-out).

**A note on the Chinese site:** editing English content through `/admin/`
does **not** update the Chinese translation at `/zh/`. The two are
independent: `/zh/` is generated from a separate translation dictionary
(`content/i18n/zh.json`), not from a live translation of the English content
files. If English wording changes, the Chinese page keeps its own existing
wording until that dictionary is updated separately — it will not silently
show the English text or break.

---

## Testing it yourself before handing it over

1. Log into `/admin/` with the GitHub account you added as a collaborator.
2. Open any collection (e.g. **Site Settings**), change something small and
   reversible, like the phone number's last digit.
3. Click **Publish** (labelled "Save" in some Decap versions).
4. Watch the repo's commit history — a new commit should appear within
   seconds, authored by Decap.
5. Watch the Vercel deployment list — a new deployment should start
   automatically and go live in under a minute.
6. Check the live site, then change the value back the same way.

If step 3 fails with an authorization error, the collaborator invite from
"Who can log in" above likely hasn't been accepted yet, or the OAuth App's
callback URL doesn't exactly match the domain being used to reach `/admin/`.
