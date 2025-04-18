# forkable
you can fork this and edit the config.ts and it should be all good and dandy
`src/config/config.ts`

## `config.ts` Explained

The `config.ts` file is the heart of this website, containing all the information needed to personalize it with your own details. Here's a breakdown of each section:

### General Information

*   **`name`**: Your name (e.g., 'Skylar Pearl').
*   **`pronouns`**: Your preferred pronouns (e.g., 'She/Her').
*   **`role`**: Your job title or role (e.g., 'Full Stack Developer').
*   **`bio`**: A short biography about yourself.  Highlight your key skills and interests.
*   **`photo`**: URL to your profile picture.  This could be a direct link or a relative path within the project.

### Social Links

The `social` object contains links to your various online profiles:

*   **`github`**: Your GitHub profile URL.
*   **`bsky`**: Your Bluesky profile URL.
*   **`work`**: A link to your professional website or portfolio.
*   **`mastodon`**: Your Mastodon username (without the `@`).
*   **`mas_instance`**: Your Mastodon instance domain (e.g., 'skye.host').  If you're not using Mastodon, you can adapt this to other platforms by placing the platform URL up to the @handle.

### Contact Information

The `contact` object stores your contact details:

*   **`email`**: Your email address.
*   **`discord`**: Your Discord username.
*   **`github`**: Your GitHub username (again).
*   **`location`**: Your general location (e.g., 'Somewhere, USA').

### Certifications

The `certs` array lists your certifications:

*   **`name`**: The name of the certification (e.g., 'Security Plus').
*   **`provider`**: The organization that issued the certification (e.g., 'CompTIA').
*   **`acquired`**: The date you obtained the certification (e.g., '2025-Apr-16').
*   **`expires`**: The expiration date of the certification. Use 'Never' if it doesn't expire.

### Skills

The `skills` array lists your skills and proficiency levels:

*   **`name`**: The name of the skill (e.g., 'Hosting Minecraft Server Network').
*   **`level`**: Your confidence level in that skill (on a scale of 0-100).

### GitHub Configuration

*   **`githubUsername`**: Your GitHub username.
*   **`featuredRepos`**: An array of repository names (just the names, not the full URLs) that you want to highlight on your portfolio.
*   **`excludedRepos`**: An array of repository names that you want to exclude from being displayed (e.g., private repositories).
*   **`github`**: An object containing further GitHub API configurations:
    *   **`apiUrl`**: The GitHub API endpoint.
    *   **`reposPerPage`**: The number of repositories to display per page.
    *   **`repoSort`**: The sorting method for repositories (e.g., 'updates' for sorting by last updated).

## How to Use `config.ts`

1.  **Clone the repository:**  Clone this repository to your local machine.
2.  **Edit `config.ts`:** Open the `config.ts` file and replace the placeholder values with your own information.
3.  **Run the website:** Follow the instructions in the project's README (if any) to run the website locally.  This usually involves installing dependencies (e.g., `npm install` or `yarn install`) and then starting the development server (e.g., `npm run dev` or `yarn dev`).
4.  **Deploy:**  Deploy the website to a hosting platform of your choice (e.g., Netlify, Vercel, GitHub Pages).

By customizing the `config.ts` file, you can easily create a personalized portfolio website to showcase your skills and projects!
