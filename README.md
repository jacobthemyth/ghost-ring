# Adding a new site to Ghost Ring
1. Add an `npm build` script to package.json. (e.g. `node_modules/.bin/ghost-helm build`)
2. Add `.drone.yml` to the site repository (See [.drone.yml.template](.drone.yml.template))
3. Add as submodule to ghost-ring
4. Add to drone
5. Add ghost-ring hook for site#dist

- To add a repo as a submodule, tracking the dist branch
`git submodule add -b dist <repository-url> sites/<name>`

# Development
- Fetch the submodules (i.e. after cloning or fetching ghost-ring).

`git submodule update --init`

- To update the submodules to the latest commit on their deploy branch

`git submodule update --remote`
