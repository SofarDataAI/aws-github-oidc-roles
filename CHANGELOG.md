## 2024-09-02

### Changed
- Updated project to version 0.2.5.
- Upgraded `aws-cdk` from `2.148.0` to `2.155.0` and related libraries.
- Updated multiple dependencies including `@aws-sdk/client-iam`, `@aws-sdk/client-sso-oidc`, and `@smithy/core` to their latest versions.

### Added
- Added checks for new environment variables `CDK_DEPLOY_REGION` and `ENVIRONMENT`.

## 2024-07-06

### Changed
- Updated project to version 0.2.4.
- Upgraded `aws-cdk` and related libraries.
- Updated multiple dependencies including `aws-sdk`, `smithy`, and others to their latest versions.
- Removed outdated dependencies and added new ones.

## 2024-06-02

### Changed
- Updated project to version 0.2.3.
- Increased Node.js engine requirement to version 16.0.0 or higher.
- Upgraded various dependencies including AWS SDK, Smithy, AWS CDK, and related libraries to their latest versions.
- Updated TypeScript and Jest related packages to ensure compatibility with new dependencies.

## 2024-04-18

### Added
- Added import statement for `cdk-nag` in `bin/aws-github-oidc-roles.ts`
- Added `appAspects.add(new ApplyTags({...}))` to apply tags to all resources in `bin/aws-github-oidc-roles.ts`
- Updated version from 0.2.0 to 0.2.1 in `package-lock.json` and `package.json`
- Updated dependencies: `@aws-sdk/client-iam`, `@aws-sdk/client-sso-oidc`, `cdk-nag` in `package-lock.json` and `package.json

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