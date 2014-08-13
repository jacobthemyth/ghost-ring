# Adding a new site to Ghost Ring
1. Make sure dist is not ignored
2. Add an `npm build` script to package.json. (e.g. `node_modules/.bin/ghost-helm build`)
3. Add `.drone.yml` to the site repository (See [.drone.yml.template](.drone.yml.template))
4. Add as submodule to ghost-ring
5. Add to drone
6. Add ghost-ring hook for site#dist

- To add a repo as a submodule, tracking the dist branch
`git submodule add -b dist <repository-url> sites/<name>`

# Development
- Fetch the submodules (i.e. after cloning or fetching ghost-ring).

`git submodule update --init`

- To update the submodules to the latest commit on their deploy branch

`git submodule update --remote`
