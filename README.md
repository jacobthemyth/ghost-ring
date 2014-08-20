# Adding a new site to Ghost Ring
1. Generate a new SSH private/public key (this can just be on your local machine)

    ```sh
    ssh-keygen -f id_rsa_<project>
    ```

    You probably want to keep it around, just in case.

2. Copy the contents of the private key (`id_rsa_project`) to Jenkins
    - Manage Jenkins > Manage Credentials > Add Credentials > SSH Username with private key
    - Username = jenkins
    - Description = The project name
    - Private key > Enter directly > Paste the private key contents

3. Copy the contents of the public key (`id_rsa_project.pub`) to the repo on GitHub
    - Settings > Deploy Keys

4. Add new free-style build to jenkins
    - Github Project = the repo URL
    - HipChat Notifications
      - Notify Build Start
      - Notify Failure
      - Notify Success
    - Source Code Management > Git
        - Repository URL = repo URL
        - Credentials = the private key you just added
    - Build Triggers > Build when a change is pushed to GitHub
    - Build Environment > SSH Agent > Specific credentials > the key you just added
    - Build > Execute Shell

        ```sh
        bower install
        npm install
        npm run build
        ```

    - Post-build Actions > Send build artifacts over SSH
        - Name = swayze
        - Source files = `dist/**/*`
        - Remove prefix = `dist`
        - Remote directory = `dist/<Name-of-Site-with-dashes-instead-of-spaces>`
    - Post-build Actions > Build other projects
        - make sure it comes after SSH publish by dragging it down
        - Projects to build = ghost-ring
    - Post-build Actions > HipChat Notification

5. Add a new free-style build to jenkins for pull requests
    - Github Project = the repo URL
    - Source Code Management > Git
        - Repository URL = repo URL
        - Credentials = the private key you just added
        - Refspec = `+refs/pull/*:refs/remotes/origin/pr/*`
        - Branch specifier = `${sha1}`
    - Build Triggers > GitHub Pull Request Builder
      - Use github hooks for build triggering
    - Build > Execute Shell

        ```sh
        bower install
        npm install
        npm run build
        ```
    - Post-build Actions > Set build status on GitHub commit

6. Add a `build` script to package.json under `scripts`. (e.g. `"build": "node_modules/.bin/ghost-helm build"`)

The first build will take quite a while because it has to `npm install` all the things.
