# ACupofAir's Blog Source

## :gear: Setup

1. clone the repertory
    ```bash
    git clone git@github.com:ACupofAir/ACupofAir.github.io.git
    ```
2. install hugo-extended
  - on ubuntu(22.04 verify)
    ```bash
    sudo apt install hugo
    ```

## :toolbox: Usage

### New Post

- `hugo new post/folder_name/index.md` will create file_name.md
- `hugo new file_name.md` will touch file_name.md in posts/file_name.md
- the default temperate is `archetypes/default.md`
### Short Code

- notice
  - notice table
    | type    | color  | meaning                             |
    | ------- | ------ | ----------------------------------- |
    | error   | red    | very important, must be attentioned |
    | warning | yellow | need attention                      |
    | note    | blue   | useful note, summary                |
    | tip     | green  | talented idea, fantastic note       |
  - notice usage
    ```js
    {{< notice $type_name >}}
    This is a colorful card.
    {{< /notice >}}
    ```

### Run Preview Local

- `hugo server --disableFastRender`

### Deploy to Website

- Just push the repo to github, I have generated CI system which can auto create public htmls on github.
