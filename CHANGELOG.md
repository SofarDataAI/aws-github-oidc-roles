## 2024-04-16

### Added
- Updated the `stackName` property in the `AwsGithubOidcRolesStack` constructor to include the `cdkRegion` variable.
- Simplified the `roleName` property in the `GithubActionsRole` constructor to use the `repoName` variable instead of the `props.resourcePrefix`.
- Added the following repositories to the `GITHUB_REPOS_NAME` environment variable: `aws-secrets-management`, `advanced-cohere-embed-v3-services`, `advanced-cohere-rerank-v3-services`.
- Updated the version of the package to `0.2.0`.

## 2024-04-16

### Added
- Implemented dotenv for environment variable management.
- Added utilities for checking required environment variables and applying tags to AWS resources.
- Defined TypeScript interface for AWS Github OIDC roles stack properties.
- Setup OIDC provider and roles for Github Actions integration.

### Changed
- Updated dependencies to include necessary libraries for AWS SDK and OIDC integration.
- Updated TypeScript configuration to extend from Node.js version 20 settings.