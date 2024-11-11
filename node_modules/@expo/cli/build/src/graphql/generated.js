/**
 * eslint-disable
 * This file was generated using GraphQL Codegen
 * Command: yarn generate-graphql-code
 * Run this during development for automatic type generation when editing GraphQL documents
 * For more info and docs, visit https://graphql-code-generator.com/
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    AccountAppsSortByField: ()=>AccountAppsSortByField,
    ActivityTimelineProjectActivityType: ()=>ActivityTimelineProjectActivityType,
    AndroidBuildType: ()=>AndroidBuildType,
    AndroidFcmVersion: ()=>AndroidFcmVersion,
    AndroidKeystoreType: ()=>AndroidKeystoreType,
    AppPlatform: ()=>AppPlatform,
    AppPrivacy: ()=>AppPrivacy,
    AppSort: ()=>AppSort,
    AppStoreConnectUserRole: ()=>AppStoreConnectUserRole,
    AppleDeviceClass: ()=>AppleDeviceClass,
    AppsFilter: ()=>AppsFilter,
    AssetMetadataStatus: ()=>AssetMetadataStatus,
    AuthProtocolType: ()=>AuthProtocolType,
    BuildCredentialsSource: ()=>BuildCredentialsSource,
    BuildIosEnterpriseProvisioning: ()=>BuildIosEnterpriseProvisioning,
    BuildJobLogsFormat: ()=>BuildJobLogsFormat,
    BuildJobStatus: ()=>BuildJobStatus,
    BuildMode: ()=>BuildMode,
    BuildPriority: ()=>BuildPriority,
    BuildResourceClass: ()=>BuildResourceClass,
    BuildRetryDisabledReason: ()=>BuildRetryDisabledReason,
    BuildStatus: ()=>BuildStatus,
    BuildTrigger: ()=>BuildTrigger,
    BuildWorkflow: ()=>BuildWorkflow,
    DistributionType: ()=>DistributionType,
    EasBuildBillingResourceClass: ()=>EasBuildBillingResourceClass,
    EasBuildDeprecationInfoType: ()=>EasBuildDeprecationInfoType,
    EasService: ()=>EasService,
    EasServiceMetric: ()=>EasServiceMetric,
    EasTotalPlanEnablementUnit: ()=>EasTotalPlanEnablementUnit,
    EnvironmentSecretType: ()=>EnvironmentSecretType,
    Feature: ()=>Feature,
    GitHubAppEnvironment: ()=>GitHubAppEnvironment,
    GitHubAppInstallationStatus: ()=>GitHubAppInstallationStatus,
    InvoiceDiscountType: ()=>InvoiceDiscountType,
    IosBuildType: ()=>IosBuildType,
    IosDistributionType: ()=>IosDistributionType,
    IosManagedBuildType: ()=>IosManagedBuildType,
    IosSchemeBuildConfiguration: ()=>IosSchemeBuildConfiguration,
    MailchimpAudience: ()=>MailchimpAudience,
    MailchimpTag: ()=>MailchimpTag,
    NotificationEvent: ()=>NotificationEvent,
    NotificationType: ()=>NotificationType,
    OfferType: ()=>OfferType,
    Order: ()=>Order,
    Permission: ()=>Permission,
    ProjectArchiveSourceType: ()=>ProjectArchiveSourceType,
    Role: ()=>Role,
    SecondFactorMethod: ()=>SecondFactorMethod,
    StandardOffer: ()=>StandardOffer,
    StatuspageIncidentImpact: ()=>StatuspageIncidentImpact,
    StatuspageIncidentStatus: ()=>StatuspageIncidentStatus,
    StatuspageServiceName: ()=>StatuspageServiceName,
    StatuspageServiceStatus: ()=>StatuspageServiceStatus,
    SubmissionAndroidArchiveType: ()=>SubmissionAndroidArchiveType,
    SubmissionAndroidReleaseStatus: ()=>SubmissionAndroidReleaseStatus,
    SubmissionAndroidTrack: ()=>SubmissionAndroidTrack,
    SubmissionArchiveSourceType: ()=>SubmissionArchiveSourceType,
    SubmissionStatus: ()=>SubmissionStatus,
    UploadSessionType: ()=>UploadSessionType,
    UsageMetricType: ()=>UsageMetricType,
    UsageMetricsGranularity: ()=>UsageMetricsGranularity,
    WebhookType: ()=>WebhookType
});
var AccountAppsSortByField;
(function(AccountAppsSortByField) {
    AccountAppsSortByField["LatestActivityTime"] = "LATEST_ACTIVITY_TIME";
    AccountAppsSortByField[/**
   * Name prefers the display name but falls back to full_name with @account/
   * part stripped.
   */ "Name"] = "NAME";
})(AccountAppsSortByField || (AccountAppsSortByField = {}));
var ActivityTimelineProjectActivityType;
(function(ActivityTimelineProjectActivityType) {
    ActivityTimelineProjectActivityType["Build"] = "BUILD";
    ActivityTimelineProjectActivityType["BuildJob"] = "BUILD_JOB";
    ActivityTimelineProjectActivityType["Submission"] = "SUBMISSION";
    ActivityTimelineProjectActivityType["Update"] = "UPDATE";
})(ActivityTimelineProjectActivityType || (ActivityTimelineProjectActivityType = {}));
var AndroidBuildType;
(function(AndroidBuildType) {
    AndroidBuildType["Apk"] = "APK";
    AndroidBuildType["AppBundle"] = "APP_BUNDLE";
    AndroidBuildType[/** @deprecated Use developmentClient option instead. */ "DevelopmentClient"] = "DEVELOPMENT_CLIENT";
})(AndroidBuildType || (AndroidBuildType = {}));
var AndroidFcmVersion;
(function(AndroidFcmVersion) {
    AndroidFcmVersion["Legacy"] = "LEGACY";
    AndroidFcmVersion["V1"] = "V1";
})(AndroidFcmVersion || (AndroidFcmVersion = {}));
var AndroidKeystoreType;
(function(AndroidKeystoreType) {
    AndroidKeystoreType["Jks"] = "JKS";
    AndroidKeystoreType["Pkcs12"] = "PKCS12";
    AndroidKeystoreType["Unknown"] = "UNKNOWN";
})(AndroidKeystoreType || (AndroidKeystoreType = {}));
var AppPlatform;
(function(AppPlatform) {
    AppPlatform["Android"] = "ANDROID";
    AppPlatform["Ios"] = "IOS";
})(AppPlatform || (AppPlatform = {}));
var AppPrivacy;
(function(AppPrivacy) {
    AppPrivacy["Hidden"] = "HIDDEN";
    AppPrivacy["Public"] = "PUBLIC";
    AppPrivacy["Unlisted"] = "UNLISTED";
})(AppPrivacy || (AppPrivacy = {}));
var AppSort;
(function(AppSort) {
    AppSort[/** Sort by recently published */ "RecentlyPublished"] = "RECENTLY_PUBLISHED";
    AppSort[/** Sort by highest trendScore */ "Viewed"] = "VIEWED";
})(AppSort || (AppSort = {}));
var AppStoreConnectUserRole;
(function(AppStoreConnectUserRole) {
    AppStoreConnectUserRole["AccessToReports"] = "ACCESS_TO_REPORTS";
    AppStoreConnectUserRole["AccountHolder"] = "ACCOUNT_HOLDER";
    AppStoreConnectUserRole["Admin"] = "ADMIN";
    AppStoreConnectUserRole["AppManager"] = "APP_MANAGER";
    AppStoreConnectUserRole["CloudManagedAppDistribution"] = "CLOUD_MANAGED_APP_DISTRIBUTION";
    AppStoreConnectUserRole["CloudManagedDeveloperId"] = "CLOUD_MANAGED_DEVELOPER_ID";
    AppStoreConnectUserRole["CreateApps"] = "CREATE_APPS";
    AppStoreConnectUserRole["CustomerSupport"] = "CUSTOMER_SUPPORT";
    AppStoreConnectUserRole["Developer"] = "DEVELOPER";
    AppStoreConnectUserRole["Finance"] = "FINANCE";
    AppStoreConnectUserRole["ImageManager"] = "IMAGE_MANAGER";
    AppStoreConnectUserRole["Marketing"] = "MARKETING";
    AppStoreConnectUserRole["ReadOnly"] = "READ_ONLY";
    AppStoreConnectUserRole["Sales"] = "SALES";
    AppStoreConnectUserRole["Technical"] = "TECHNICAL";
    AppStoreConnectUserRole["Unknown"] = "UNKNOWN";
})(AppStoreConnectUserRole || (AppStoreConnectUserRole = {}));
var AppleDeviceClass;
(function(AppleDeviceClass) {
    AppleDeviceClass["Ipad"] = "IPAD";
    AppleDeviceClass["Iphone"] = "IPHONE";
})(AppleDeviceClass || (AppleDeviceClass = {}));
var AppsFilter;
(function(AppsFilter) {
    AppsFilter[/** Featured Projects */ "Featured"] = "FEATURED";
    AppsFilter[/** New Projects */ "New"] = "NEW";
})(AppsFilter || (AppsFilter = {}));
var AssetMetadataStatus;
(function(AssetMetadataStatus) {
    AssetMetadataStatus["DoesNotExist"] = "DOES_NOT_EXIST";
    AssetMetadataStatus["Exists"] = "EXISTS";
})(AssetMetadataStatus || (AssetMetadataStatus = {}));
var AuthProtocolType;
(function(AuthProtocolType) {
    AuthProtocolType["Oidc"] = "OIDC";
})(AuthProtocolType || (AuthProtocolType = {}));
var BuildCredentialsSource;
(function(BuildCredentialsSource) {
    BuildCredentialsSource["Local"] = "LOCAL";
    BuildCredentialsSource["Remote"] = "REMOTE";
})(BuildCredentialsSource || (BuildCredentialsSource = {}));
var BuildIosEnterpriseProvisioning;
(function(BuildIosEnterpriseProvisioning) {
    BuildIosEnterpriseProvisioning["Adhoc"] = "ADHOC";
    BuildIosEnterpriseProvisioning["Universal"] = "UNIVERSAL";
})(BuildIosEnterpriseProvisioning || (BuildIosEnterpriseProvisioning = {}));
var BuildJobLogsFormat;
(function(BuildJobLogsFormat) {
    BuildJobLogsFormat["Json"] = "JSON";
    BuildJobLogsFormat["Raw"] = "RAW";
})(BuildJobLogsFormat || (BuildJobLogsFormat = {}));
var BuildJobStatus;
(function(BuildJobStatus) {
    BuildJobStatus["Errored"] = "ERRORED";
    BuildJobStatus["Finished"] = "FINISHED";
    BuildJobStatus["InProgress"] = "IN_PROGRESS";
    BuildJobStatus["Pending"] = "PENDING";
    BuildJobStatus["SentToQueue"] = "SENT_TO_QUEUE";
    BuildJobStatus["Started"] = "STARTED";
})(BuildJobStatus || (BuildJobStatus = {}));
var BuildMode;
(function(BuildMode) {
    BuildMode["Build"] = "BUILD";
    BuildMode["Custom"] = "CUSTOM";
    BuildMode["Resign"] = "RESIGN";
})(BuildMode || (BuildMode = {}));
var BuildPriority;
(function(BuildPriority) {
    BuildPriority["High"] = "HIGH";
    BuildPriority["Normal"] = "NORMAL";
    BuildPriority["NormalPlus"] = "NORMAL_PLUS";
})(BuildPriority || (BuildPriority = {}));
var BuildResourceClass;
(function(BuildResourceClass) {
    BuildResourceClass["AndroidDefault"] = "ANDROID_DEFAULT";
    BuildResourceClass["AndroidLarge"] = "ANDROID_LARGE";
    BuildResourceClass["AndroidMedium"] = "ANDROID_MEDIUM";
    BuildResourceClass["IosDefault"] = "IOS_DEFAULT";
    BuildResourceClass[/** @deprecated Use IOS_INTEL_MEDIUM instead */ "IosIntelLarge"] = "IOS_INTEL_LARGE";
    BuildResourceClass["IosIntelMedium"] = "IOS_INTEL_MEDIUM";
    BuildResourceClass["IosLarge"] = "IOS_LARGE";
    BuildResourceClass[/** @deprecated Use IOS_M_MEDIUM instead */ "IosM1Large"] = "IOS_M1_LARGE";
    BuildResourceClass["IosM1Medium"] = "IOS_M1_MEDIUM";
    BuildResourceClass["IosMedium"] = "IOS_MEDIUM";
    BuildResourceClass["IosMLarge"] = "IOS_M_LARGE";
    BuildResourceClass["IosMMedium"] = "IOS_M_MEDIUM";
    BuildResourceClass["Legacy"] = "LEGACY";
})(BuildResourceClass || (BuildResourceClass = {}));
var BuildRetryDisabledReason;
(function(BuildRetryDisabledReason) {
    BuildRetryDisabledReason["AlreadyRetried"] = "ALREADY_RETRIED";
    BuildRetryDisabledReason["InvalidStatus"] = "INVALID_STATUS";
    BuildRetryDisabledReason["IsGithubBuild"] = "IS_GITHUB_BUILD";
    BuildRetryDisabledReason["NotCompletedYet"] = "NOT_COMPLETED_YET";
    BuildRetryDisabledReason["TooMuchTimeElapsed"] = "TOO_MUCH_TIME_ELAPSED";
})(BuildRetryDisabledReason || (BuildRetryDisabledReason = {}));
var BuildStatus;
(function(BuildStatus) {
    BuildStatus["Canceled"] = "CANCELED";
    BuildStatus["Errored"] = "ERRORED";
    BuildStatus["Finished"] = "FINISHED";
    BuildStatus["InProgress"] = "IN_PROGRESS";
    BuildStatus["InQueue"] = "IN_QUEUE";
    BuildStatus["New"] = "NEW";
})(BuildStatus || (BuildStatus = {}));
var BuildTrigger;
(function(BuildTrigger) {
    BuildTrigger["EasCli"] = "EAS_CLI";
    BuildTrigger["GitBasedIntegration"] = "GIT_BASED_INTEGRATION";
})(BuildTrigger || (BuildTrigger = {}));
var BuildWorkflow;
(function(BuildWorkflow) {
    BuildWorkflow["Generic"] = "GENERIC";
    BuildWorkflow["Managed"] = "MANAGED";
    BuildWorkflow["Unknown"] = "UNKNOWN";
})(BuildWorkflow || (BuildWorkflow = {}));
var DistributionType;
(function(DistributionType) {
    DistributionType["Internal"] = "INTERNAL";
    DistributionType["Simulator"] = "SIMULATOR";
    DistributionType["Store"] = "STORE";
})(DistributionType || (DistributionType = {}));
var EasBuildBillingResourceClass;
(function(EasBuildBillingResourceClass) {
    EasBuildBillingResourceClass["Large"] = "LARGE";
    EasBuildBillingResourceClass["Medium"] = "MEDIUM";
})(EasBuildBillingResourceClass || (EasBuildBillingResourceClass = {}));
var EasBuildDeprecationInfoType;
(function(EasBuildDeprecationInfoType) {
    EasBuildDeprecationInfoType["Internal"] = "INTERNAL";
    EasBuildDeprecationInfoType["UserFacing"] = "USER_FACING";
})(EasBuildDeprecationInfoType || (EasBuildDeprecationInfoType = {}));
var EasService;
(function(EasService) {
    EasService["Builds"] = "BUILDS";
    EasService["Updates"] = "UPDATES";
})(EasService || (EasService = {}));
var EasServiceMetric;
(function(EasServiceMetric) {
    EasServiceMetric["AssetsRequests"] = "ASSETS_REQUESTS";
    EasServiceMetric["BandwidthUsage"] = "BANDWIDTH_USAGE";
    EasServiceMetric["Builds"] = "BUILDS";
    EasServiceMetric["ManifestRequests"] = "MANIFEST_REQUESTS";
    EasServiceMetric["UniqueUpdaters"] = "UNIQUE_UPDATERS";
    EasServiceMetric["UniqueUsers"] = "UNIQUE_USERS";
})(EasServiceMetric || (EasServiceMetric = {}));
var EasTotalPlanEnablementUnit;
(function(EasTotalPlanEnablementUnit) {
    EasTotalPlanEnablementUnit["Build"] = "BUILD";
    EasTotalPlanEnablementUnit["Byte"] = "BYTE";
    EasTotalPlanEnablementUnit["Concurrency"] = "CONCURRENCY";
    EasTotalPlanEnablementUnit["Request"] = "REQUEST";
    EasTotalPlanEnablementUnit["Updater"] = "UPDATER";
    EasTotalPlanEnablementUnit["User"] = "USER";
})(EasTotalPlanEnablementUnit || (EasTotalPlanEnablementUnit = {}));
var EnvironmentSecretType;
(function(EnvironmentSecretType) {
    EnvironmentSecretType["FileBase64"] = "FILE_BASE64";
    EnvironmentSecretType["String"] = "STRING";
})(EnvironmentSecretType || (EnvironmentSecretType = {}));
var Feature;
(function(Feature) {
    Feature[/** Priority Builds */ "Builds"] = "BUILDS";
    Feature[/** Funds support for open source development */ "OpenSource"] = "OPEN_SOURCE";
    Feature[/** Top Tier Support */ "Support"] = "SUPPORT";
    Feature[/** Share access to projects */ "Teams"] = "TEAMS";
})(Feature || (Feature = {}));
var GitHubAppEnvironment;
(function(GitHubAppEnvironment) {
    GitHubAppEnvironment["Development"] = "DEVELOPMENT";
    GitHubAppEnvironment["Production"] = "PRODUCTION";
    GitHubAppEnvironment["Staging"] = "STAGING";
})(GitHubAppEnvironment || (GitHubAppEnvironment = {}));
var GitHubAppInstallationStatus;
(function(GitHubAppInstallationStatus) {
    GitHubAppInstallationStatus["Active"] = "ACTIVE";
    GitHubAppInstallationStatus["NotInstalled"] = "NOT_INSTALLED";
    GitHubAppInstallationStatus["Suspended"] = "SUSPENDED";
})(GitHubAppInstallationStatus || (GitHubAppInstallationStatus = {}));
var InvoiceDiscountType;
(function(InvoiceDiscountType) {
    InvoiceDiscountType["Amount"] = "AMOUNT";
    InvoiceDiscountType["Percentage"] = "PERCENTAGE";
})(InvoiceDiscountType || (InvoiceDiscountType = {}));
var IosBuildType;
(function(IosBuildType) {
    IosBuildType["DevelopmentClient"] = "DEVELOPMENT_CLIENT";
    IosBuildType["Release"] = "RELEASE";
})(IosBuildType || (IosBuildType = {}));
var IosDistributionType;
(function(IosDistributionType) {
    IosDistributionType["AdHoc"] = "AD_HOC";
    IosDistributionType["AppStore"] = "APP_STORE";
    IosDistributionType["Development"] = "DEVELOPMENT";
    IosDistributionType["Enterprise"] = "ENTERPRISE";
})(IosDistributionType || (IosDistributionType = {}));
var IosManagedBuildType;
(function(IosManagedBuildType) {
    IosManagedBuildType["DevelopmentClient"] = "DEVELOPMENT_CLIENT";
    IosManagedBuildType["Release"] = "RELEASE";
})(IosManagedBuildType || (IosManagedBuildType = {}));
var IosSchemeBuildConfiguration;
(function(IosSchemeBuildConfiguration) {
    IosSchemeBuildConfiguration["Debug"] = "DEBUG";
    IosSchemeBuildConfiguration["Release"] = "RELEASE";
})(IosSchemeBuildConfiguration || (IosSchemeBuildConfiguration = {}));
var MailchimpAudience;
(function(MailchimpAudience) {
    MailchimpAudience["ExpoDevelopers"] = "EXPO_DEVELOPERS";
})(MailchimpAudience || (MailchimpAudience = {}));
var MailchimpTag;
(function(MailchimpTag) {
    MailchimpTag["DevClientUsers"] = "DEV_CLIENT_USERS";
    MailchimpTag["EasMasterList"] = "EAS_MASTER_LIST";
})(MailchimpTag || (MailchimpTag = {}));
var NotificationEvent;
(function(NotificationEvent) {
    NotificationEvent["BuildComplete"] = "BUILD_COMPLETE";
    NotificationEvent["SubmissionComplete"] = "SUBMISSION_COMPLETE";
})(NotificationEvent || (NotificationEvent = {}));
var NotificationType;
(function(NotificationType) {
    NotificationType["Email"] = "EMAIL";
})(NotificationType || (NotificationType = {}));
var OfferType;
(function(OfferType) {
    OfferType[/** Addon, or supplementary subscription */ "Addon"] = "ADDON";
    OfferType[/** Advanced Purchase of Paid Resource */ "Prepaid"] = "PREPAID";
    OfferType[/** Term subscription */ "Subscription"] = "SUBSCRIPTION";
})(OfferType || (OfferType = {}));
var Order;
(function(Order) {
    Order["Asc"] = "ASC";
    Order["Desc"] = "DESC";
})(Order || (Order = {}));
var Permission;
(function(Permission) {
    Permission["Admin"] = "ADMIN";
    Permission["Own"] = "OWN";
    Permission["Publish"] = "PUBLISH";
    Permission["View"] = "VIEW";
})(Permission || (Permission = {}));
var ProjectArchiveSourceType;
(function(ProjectArchiveSourceType) {
    ProjectArchiveSourceType["Gcs"] = "GCS";
    ProjectArchiveSourceType["Git"] = "GIT";
    ProjectArchiveSourceType["None"] = "NONE";
    ProjectArchiveSourceType["S3"] = "S3";
    ProjectArchiveSourceType["Url"] = "URL";
})(ProjectArchiveSourceType || (ProjectArchiveSourceType = {}));
var Role;
(function(Role) {
    Role["Admin"] = "ADMIN";
    Role["Custom"] = "CUSTOM";
    Role["Developer"] = "DEVELOPER";
    Role["HasAdmin"] = "HAS_ADMIN";
    Role["NotAdmin"] = "NOT_ADMIN";
    Role["Owner"] = "OWNER";
    Role["ViewOnly"] = "VIEW_ONLY";
})(Role || (Role = {}));
var SecondFactorMethod;
(function(SecondFactorMethod) {
    SecondFactorMethod[/** Google Authenticator (TOTP) */ "Authenticator"] = "AUTHENTICATOR";
    SecondFactorMethod[/** SMS */ "Sms"] = "SMS";
})(SecondFactorMethod || (SecondFactorMethod = {}));
var StandardOffer;
(function(StandardOffer) {
    StandardOffer[/** $29 USD per month, 30 day trial */ "Default"] = "DEFAULT";
    StandardOffer[/** $800 USD per month */ "Support"] = "SUPPORT";
    StandardOffer[/** $29 USD per month, 1 year trial */ "YcDeals"] = "YC_DEALS";
    StandardOffer[/** $348 USD per year, 30 day trial */ "YearlySub"] = "YEARLY_SUB";
})(StandardOffer || (StandardOffer = {}));
var StatuspageIncidentImpact;
(function(StatuspageIncidentImpact) {
    StatuspageIncidentImpact["Critical"] = "CRITICAL";
    StatuspageIncidentImpact["Maintenance"] = "MAINTENANCE";
    StatuspageIncidentImpact["Major"] = "MAJOR";
    StatuspageIncidentImpact["Minor"] = "MINOR";
    StatuspageIncidentImpact["None"] = "NONE";
})(StatuspageIncidentImpact || (StatuspageIncidentImpact = {}));
var StatuspageIncidentStatus;
(function(StatuspageIncidentStatus) {
    StatuspageIncidentStatus["Completed"] = "COMPLETED";
    StatuspageIncidentStatus["Identified"] = "IDENTIFIED";
    StatuspageIncidentStatus["Investigating"] = "INVESTIGATING";
    StatuspageIncidentStatus["InProgress"] = "IN_PROGRESS";
    StatuspageIncidentStatus["Monitoring"] = "MONITORING";
    StatuspageIncidentStatus["Resolved"] = "RESOLVED";
    StatuspageIncidentStatus["Scheduled"] = "SCHEDULED";
    StatuspageIncidentStatus["Verifying"] = "VERIFYING";
})(StatuspageIncidentStatus || (StatuspageIncidentStatus = {}));
var StatuspageServiceName;
(function(StatuspageServiceName) {
    StatuspageServiceName["EasBuild"] = "EAS_BUILD";
    StatuspageServiceName["EasSubmit"] = "EAS_SUBMIT";
    StatuspageServiceName["EasUpdate"] = "EAS_UPDATE";
})(StatuspageServiceName || (StatuspageServiceName = {}));
var StatuspageServiceStatus;
(function(StatuspageServiceStatus) {
    StatuspageServiceStatus["DegradedPerformance"] = "DEGRADED_PERFORMANCE";
    StatuspageServiceStatus["MajorOutage"] = "MAJOR_OUTAGE";
    StatuspageServiceStatus["Operational"] = "OPERATIONAL";
    StatuspageServiceStatus["PartialOutage"] = "PARTIAL_OUTAGE";
    StatuspageServiceStatus["UnderMaintenance"] = "UNDER_MAINTENANCE";
})(StatuspageServiceStatus || (StatuspageServiceStatus = {}));
var SubmissionAndroidArchiveType;
(function(SubmissionAndroidArchiveType) {
    SubmissionAndroidArchiveType["Aab"] = "AAB";
    SubmissionAndroidArchiveType["Apk"] = "APK";
})(SubmissionAndroidArchiveType || (SubmissionAndroidArchiveType = {}));
var SubmissionAndroidReleaseStatus;
(function(SubmissionAndroidReleaseStatus) {
    SubmissionAndroidReleaseStatus["Completed"] = "COMPLETED";
    SubmissionAndroidReleaseStatus["Draft"] = "DRAFT";
    SubmissionAndroidReleaseStatus["Halted"] = "HALTED";
    SubmissionAndroidReleaseStatus["InProgress"] = "IN_PROGRESS";
})(SubmissionAndroidReleaseStatus || (SubmissionAndroidReleaseStatus = {}));
var SubmissionAndroidTrack;
(function(SubmissionAndroidTrack) {
    SubmissionAndroidTrack["Alpha"] = "ALPHA";
    SubmissionAndroidTrack["Beta"] = "BETA";
    SubmissionAndroidTrack["Internal"] = "INTERNAL";
    SubmissionAndroidTrack["Production"] = "PRODUCTION";
})(SubmissionAndroidTrack || (SubmissionAndroidTrack = {}));
var SubmissionArchiveSourceType;
(function(SubmissionArchiveSourceType) {
    SubmissionArchiveSourceType["GcsBuildApplicationArchive"] = "GCS_BUILD_APPLICATION_ARCHIVE";
    SubmissionArchiveSourceType["GcsSubmitArchive"] = "GCS_SUBMIT_ARCHIVE";
    SubmissionArchiveSourceType["Url"] = "URL";
})(SubmissionArchiveSourceType || (SubmissionArchiveSourceType = {}));
var SubmissionStatus;
(function(SubmissionStatus) {
    SubmissionStatus["AwaitingBuild"] = "AWAITING_BUILD";
    SubmissionStatus["Canceled"] = "CANCELED";
    SubmissionStatus["Errored"] = "ERRORED";
    SubmissionStatus["Finished"] = "FINISHED";
    SubmissionStatus["InProgress"] = "IN_PROGRESS";
    SubmissionStatus["InQueue"] = "IN_QUEUE";
})(SubmissionStatus || (SubmissionStatus = {}));
var UploadSessionType;
(function(UploadSessionType) {
    UploadSessionType["EasBuildGcsProjectSources"] = "EAS_BUILD_GCS_PROJECT_SOURCES";
    UploadSessionType["EasBuildProjectSources"] = "EAS_BUILD_PROJECT_SOURCES";
    UploadSessionType["EasSubmitAppArchive"] = "EAS_SUBMIT_APP_ARCHIVE";
    UploadSessionType["EasSubmitGcsAppArchive"] = "EAS_SUBMIT_GCS_APP_ARCHIVE";
})(UploadSessionType || (UploadSessionType = {}));
var UsageMetricType;
(function(UsageMetricType) {
    UsageMetricType["Bandwidth"] = "BANDWIDTH";
    UsageMetricType["Build"] = "BUILD";
    UsageMetricType["Request"] = "REQUEST";
    UsageMetricType["Update"] = "UPDATE";
    UsageMetricType["User"] = "USER";
})(UsageMetricType || (UsageMetricType = {}));
var UsageMetricsGranularity;
(function(UsageMetricsGranularity) {
    UsageMetricsGranularity["Day"] = "DAY";
    UsageMetricsGranularity["Hour"] = "HOUR";
    UsageMetricsGranularity["Minute"] = "MINUTE";
    UsageMetricsGranularity["Total"] = "TOTAL";
})(UsageMetricsGranularity || (UsageMetricsGranularity = {}));
var WebhookType;
(function(WebhookType) {
    WebhookType["Build"] = "BUILD";
    WebhookType["Submit"] = "SUBMIT";
})(WebhookType || (WebhookType = {}));

//# sourceMappingURL=generated.js.map