# Adding a new site to Ghost Ring
1. Add a `build` script to package.json under `scripts`. (e.g. `"build": "node_modules/.bin/ghost-helm build"`)
2. Add Jenkins SSH key as deploy key on repo

```sh
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDn5UNMPW5n8De2zWEckR5nC7co17RSdc2R7phNZUYe+M582iVfW58xRL0s9yT8Yz8niyq0KGhs+m2TdUcoSPtn4MOz5Ci68MXUo5E0e8lO7ngbCE5J+xsBmBZ1xY/FFKRWipNj34JNic9oWIriohLeJvYc1SAWD445S1egFGPj0cIVDqTQyg5iQMXjEoyWQqMmGVqoIGlGk+sWpkJ+6VjSZ+LgIcTwuG6QUEbwrhM7X1ox/O3hx8ySxL+Dw5KvCaNqiig62/7EmoOCncPdMjbheRmDs9qi3iUgId2ck5Yem8QL8nc+cWXni6E+LDbTHbnNfcKl3TLyc+WfHckgebeF jake@theironyard.com
```

3. Add new free-style build to jenkins
  - Source Code Management > Git > Repository URL
  - Build Triggers > Build when a change is pushed to GitHub
  - Build > Execute Shell
     ```sh
    npm install
    npm run build
    ```
  - Post-build Actions > Send build artifacts over SSH
    - Name = swayze
    - Source files = `dist/**/*`
    - Remove prefix = `dist`
    - Remote directory = `dist/<Name-of-Site-with-dashes-instead-of-spaces>`
  - Post-build Actions > Build other projects (make sure it comes after SSH publish)
    - Projects to build = ghost-ring
