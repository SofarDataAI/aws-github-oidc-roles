import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { GithubActionsIdentityProvider, GithubActionsRole } from "aws-cdk-github-oidc";
import { AwsGithubOidcRolesStackProps } from './AwsGithubOidcRolesStackProps';

/**
 * The `AwsGithubOidcRolesStack` class is responsible for creating the AWS infrastructure
 * necessary to support GitHub Actions CI/CD workflows with AWS roles. It sets up an OpenID
 * Connect (OIDC) provider and roles for GitHub Actions to deploy resources to AWS.
 *
 * @param {Construct} scope - The scope in which to define this construct.
 * @param {string} id - The scoped construct ID.
 * @param {AwsGithubOidcRolesStackProps} props - The stack properties.
 */
export class AwsGithubOidcRolesStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AwsGithubOidcRolesStackProps) {
    super(scope, id, props);

    const provider = GithubActionsIdentityProvider.fromOpenIdConnectProviderArn(this, `${props.resourcePrefix}-GithubActionsIdentityProvider`, props.openIdConnectProviderArn);

    const removalPolicy = props.deployEnvironment === 'production' ? cdk.RemovalPolicy.RETAIN : cdk.RemovalPolicy.DESTROY;

    for (const repoName of props.githubReposName) {
      // define the deployment role
      const githubActionsRole = new GithubActionsRole(this, `${props.resourcePrefix}-github-action-role-${repoName}`, {
        provider: provider,
        owner: props.githubOrgName,
        repo: repoName,
        roleName: `${props.resourcePrefix}-${repoName}`,
        description: `This role deploys stuff to AWS for ${props.githubOrgName}-${repoName}.`,
        maxSessionDuration: cdk.Duration.hours(2),
      });

      githubActionsRole.addManagedPolicy(
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')
      );
      githubActionsRole.applyRemovalPolicy(removalPolicy);

      // export deployRole ARN with exportName with the format of `appName-deployEnvironment-repoName-DeployRoleArn`
      new cdk.CfnOutput(this, `${props.resourcePrefix}-${props.deployEnvironment}-${repoName}-DeployRoleArn`, {
        value: githubActionsRole.roleArn,
        exportName: `${props.appName}-${props.deployEnvironment}-${repoName}-DeployRoleArn`,
        description: `The ARN of the deploy role for ${props.githubOrgName}-${repoName} in ${props.deployEnvironment}.`,
      });
    }
  }
}
