- To add a repo as a submodule, tracking the deploy branch
`git submodule add -b deploy git://github.com/jacobthemyth/all-my-dead-relatives.git relatives`

- To fetch the submodules (i.e. after cloning or fetching ghost-ring).
`git submodule update --init`

- To update the submodules to the latest commit on their deploy branch
`git submodule update --remote`
