#!/usr/bin/env node
import 'source-map-support/register';

import * as cdk from 'aws-cdk-lib';
import * as dotenv from 'dotenv';
import { Aspects } from 'aws-cdk-lib';
import { ApplyTags } from '../utils/apply-tag';
import { checkEnvVariables } from '../utils/check-environment-variable';
import { AwsGithubOidcRolesStackProps } from '../lib/AwsGithubOidcRolesStackProps';
import { AwsGithubOidcRolesStack } from '../lib/aws-github-oidc-roles-stack';

dotenv.config(); // Load environment variables from .env file
const app = new cdk.App();
const appAspects = Aspects.of(app);

// check environment variables
checkEnvVariables('APP_NAME', 'GITHUB_ORG_NAME', 'GITHUB_REPOS_NAME', 'OPENID_CONNECT_PROVIDER_ARN', 'OWNER', 'CDK_DEPLOY_REGION', 'ENVIRONMENT');

const { CDK_DEFAULT_ACCOUNT: account } = process.env;

const cdkRegion = process.env.CDK_DEPLOY_REGION!;
const deployEnvironment = process.env.ENVIRONMENT!;

const appName = process.env.APP_NAME!;
const owner = process.env.OWNER!;

// apply tags to all resources
appAspects.add(new ApplyTags({
  environment: deployEnvironment as 'development' | 'staging' | 'production' | 'demonstration',
  project: appName,
  owner: owner,
}));

const stackProps: AwsGithubOidcRolesStackProps = {
  resourcePrefix: `${appName}-${deployEnvironment}`,
  env: {
      region: cdkRegion,
      account,
  },
  deployRegion: cdkRegion,
  deployEnvironment,
  appName,
  githubOrgName: process.env.GITHUB_ORG_NAME!,
  githubReposName: process.env.GITHUB_REPOS_NAME!.split(','),
  openIdConnectProviderArn: process.env.OPENID_CONNECT_PROVIDER_ARN!,
};
new AwsGithubOidcRolesStack(app, `AwsGithubOidcRolesStack`, {
  ...stackProps,
  stackName: `${appName}-${deployEnvironment}-${cdkRegion}-AwsGithubOidcRolesStack`,
  description: `AwsGithubOidcRolesStack for ${appName} in ${cdkRegion} ${deployEnvironment}.`,
});

app.synth();
