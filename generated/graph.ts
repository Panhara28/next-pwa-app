/* eslint-disable */export declare namespace Graph {  export interface Query {    _empty?: null | string;    me?: null | User;    configuration?: null | Configuration;    user?: null | User;    userList?: null | UserList;    userListTop?: UserTop[] | null;    userListTopSale?: UserTopSale[] | null;    userGroupList?: UserGroup[] | null;    userAnalytic?: null | UserAnalytic;    userBalanceTransactionList?: null | BalanceTransactionList;    userRegisterList?: null | UserRegisterList;    adsCampaignList?: null | AdsCampaignList;    adsCampaign?: null | AdsCampaign;    adsCreative?: null | AdsCreative;    article?: null | Article;    articleList?: null | ArticleList;    articleListPremium?: null | ArticleList;    articleListPR?: null | ArticleList;    articleListHot?: null | ArticleList;    articleListTop?: null | ArticleList;    articleListTopByHour?: null | ArticleList;    articleTotal?: null | ArticleTotal;    articleTotalEachCategory?: ArticleTotalEachCategory[] | null;    articleTotalByWriter?: ArticleTotalByWriter[] | null;    articleLogList?: ArticleLogList[] | null;    articleAnalytic?: null | ArticleAnalytic;    writerList?: ArticleAdmin[] | null;    writer?: null | Writer;    category?: null | Category;    categoryList?: null | CategoryList;    categorySubList?: Category[] | null;    articleSourceList?: ArticleSource[] | null;    celebrityList?: null | CelebrityList;    celebrity?: null | Celebrity;    tagList?: null | TagList;    fashionModel?: null | FashionModel;    fashionModelList?: null | FashionModelList;    fashionPhoto?: null | FashionPhoto;    fashionPhotoList?: null | FashionPhotoList;    customer?: null | Customer;    customerList?: null | CustomerList;    reportArticle?: null | reportArticle;    reportContributor?: null | reportContributor;    reportEditorPerformance?: null | reportEditorPerformance;    disbursement?: null | Disbursement;    disbursementList?: null | DisbursementList;    disbursementLogList?: null | DisbursementLogList;    disbursementBalanceTransactionList?: null | BalanceTransactionList;    setting?: Setting[] | null;    settingList?: Setting[] | null;  }  export interface Mutation {    _empty?: null | string;    addUser?: null | number;    updateUser?: null | boolean;    updateUserSelfInfo?: null | boolean;    userLogin?: null | string;    userChangePassword?: null | boolean;    registerUser?: null | string;    updateStatusRegisterUser?: null | number;    addAdsCampaign?: null | number;    updateAdsCampaign?: null | boolean;    addAdsCreative?: null | boolean;    updateAdsCreative?: null | boolean;    updateAdsCampaignZone?: null | boolean;    upload: UploadedFile;    addArticle?: null | number;    updateArticle?: null | boolean;    deleteArticle?: null | boolean;    addArticleLog?: null | number;    fashionModelCreate?: null | number;    fashionModelUpdate?: null | boolean;    fashionPhotoCreate?: null | boolean;    fashionPhotoUpdate?: null | boolean;    fashionPhotoDelete?: null | boolean;    addCustomer?: null | number;    updateCustomer?: null | boolean;    requestDisbursement?: null | boolean;    updateDisbursement?: null | boolean;    approveDisbursement?: null | boolean;    rejectDisbursement?: null | boolean;    payDisbursement?: null | boolean;    notificationPush?: null | boolean;    updateSetting?: null | boolean;  }  export interface NameFormat {    en?: null | string;    kh?: null | string;  }  export interface Pagination {    total: number;    current: number;    size: number;  }  export interface PageviewDateRange {    date?: null | string;    pageview?: null | number;  }  export interface PageviewBySite {    siteId?: null | number;    siteName?: null | string;    pageview?: null | number;  }  export interface BalanceDateRange {    date?: null | string;    amount?: null | string;  }  export interface PaginationInput {    page: number;    size: number;  }  export interface Configuration {    websites?: ConfigurationWebsite[] | null;  }  export interface ConfigurationWebsite {    siteId?: null | number;    siteName?: null | string;    siteColor?: null | string;  }  export interface UserLoginInput {    username: string;    password: string;  }  export interface UserChangePasswordInput {    oldPassword: string;    newPassword: string;    newPasswordConfirm: string;  }  export interface UserInput {    id?: null | number;    username: string;    password?: null | string;    passwordConfirm?: null | string;    nameKH: string;    nameEN: string;    nameDisplay: string;    phoneNumber: string;    bankAccountName?: null | string;    bankAccountNumber?: null | string;    email?: null | string;    documents: string;    groupId: number;    addressKH?: null | string;    biography?: null | string;    createdDateTime?: null | string;  }  export interface UserUpdateInput {    id?: null | number;    username?: null | string;    password?: null | string;    passwordConfirm?: null | string;    nameKH?: null | string;    nameEN?: null | string;    nameDisplay?: null | string;    phoneNumber?: null | string;    bankAccountName?: null | string;    bankAccountNumber?: null | string;    email?: null | string;    documents?: null | string;    groupId?: null | number;    addressKH?: null | string;    biography?: null | string;    active?: null | boolean;    createdDateTime?: null | string;  }  export interface UserInputSelfInfo {    biography?: null | string;    addressKH?: null | string;  }  export interface UserRegisterInput {    username: string;    password: string;    passwordConfirm: string;    nameKH: string;    nameEN: string;    nameDisplay?: null | string;    groupId: number;    phoneNumber: string;    bankAccountName?: null | string;    bankAccountNumber?: null | string;    submittedDateTime?: null | string;  }  export interface User {    id?: null | string;    username?: null | string;    name?: null | NameFormat;    nameDisplay?: null | string;    phoneNumber?: null | string;    email?: null | string;    documents?: null | string;    bankAccountName?: null | string;    bankAccountNumber?: null | string;    totalBalance?: null | string;    totalBalanceTax?: null | string;    totalBalanceAfterTax?: null | string;    groupId?: null | number;    addressKH?: null | string;    biography?: null | string;    role?: null | string;    profilePicture?: null | string;    uploadStorage?: null | string;    superPermission?: null | boolean;    permissions?: string[] | null;    active?: null | boolean;  }  export interface UserList {    data?: User[] | null;    page?: null | Pagination;  }  export interface UserRegisterList {    data?: UserRegister[] | null;    page?: null | Pagination;  }  export interface UserRegister {    id?: null | number;    username?: null | string;    name?: null | NameFormat;    nameDisplay?: null | string;    groupId?: null | number;    phoneNumber?: null | string;    bankAccountName?: null | string;    bankAccountNumber?: null | string;    submittedDateTime?: null | string;    actionDateTime?: null | string;    status?: null | UserRegisterStatusEnum;  }  export type UserRegisterStatusEnum = 'PENDING' | 'APPROVED' | 'REJECTED';  export interface UserTop {    writer?: null | ArticleAdmin;    totalArticle?: null | number;    pageview?: null | number;  }  export interface UserTopSale {    writer?: null | ArticleAdmin;    totalArticle?: null | number;    totalBalance?: null | string;  }  export interface UserGroup {    id?: null | number;    name?: null | string;  }  export interface UserAnalytic {    pageview?: null | number;    pageviewBySite?: PageviewBySite[] | null;    pageviewPerDay?: PageviewDateRange[] | null;    totalArticle?: null | number;    totalArticlePublished?: null | number;    totalBalance?: null | string;    totalBalanceTax?: null | string;    totalBalanceAfterTax?: null | string;    balancePerDay?: BalanceDateRange[] | null;  }  export interface BalanceTransactionList {    data?: balanceTransaction[] | null;    page?: null | Pagination;  }  export interface balanceTransaction {    amount?: null | string;    description?: null | string;    createdDateTime?: null | string;  }  export interface UserFilterInput {    name?: null | string;    active?: null | string;    groupId?: null | number;    groupIds?: number[] | null;  }  export interface AdsCampaignInput {    id?: null | number;    name?: null | string;    totalImpression?: null | number;    price?: null | string;    startDate?: null | string;    endDate?: null | string;    status?: null | AdsCampaignStatusEnum;  }  export interface AdsCampaignFilter {    status?: null | AdsCampaignStatusEnum;  }  export interface AdsCreativeInput {    id?: null | number;    campaignId?: null | number;    type?: null | AdsCreativeEnum;    content?: null | string;    link?: null | string;    width?: null | number;    height?: null | number;  }  export interface AdsCampaignZoneInput {    id?: null | number;    active?: null | boolean;  }  export interface AdsCampaignList {    data?: AdsCampaign[] | null;    page?: null | Pagination;  }  export interface AdsCampaign {    id: number;    name?: null | string;    totalImpression?: null | number;    servedImpression?: null | number;    clicked?: null | number;    viewed?: null | number;    price?: null | string;    startDate?: null | string;    endDate?: null | string;    target?: null | string;    status?: null | AdsCampaignStatusEnum;    report?: null | AdsCampaignDailyReport;    creative?: AdsCreative[] | null;    zone?: AdsCampaignZone[] | null;  }  export interface AdsCampaignDailyReport {    data?: AdsCampaignReport[] | null;    page?: null | Pagination;  }  export interface AdsCampaignReport {    date?: null | string;    impression?: null | number;    clicked?: null | number;    viewed?: null | number;  }  export interface AdsCreative {    id?: null | number;    campaignId?: null | number;    type?: null | AdsCreativeEnum;    content?: null | string;    link?: null | string;    width?: null | number;    height?: null | number;  }  export interface AdsCampaignZone {    id?: null | number;    name?: null | string;    dailyImpression?: null | number;    active?: null | boolean;  }  export type AdsCreativeEnum = 'IMAGE' | 'JAVASCRIPT' | 'PARALLAX';  export type AdsCampaignStatusEnum = 'ACTIVE' | 'INACTIVE';  export interface UploadedFile {    filename: string;    url: string;  }  export interface ArticleInput {    id?: null | number;    title?: null | string;    summary?: null | string;    thumbnail?: null | string;    content?: null | string;    siteId?: null | number;    categoryId?: null | number;    categorySubId?: null | number;    celebrityIds?: number[] | null;    tagIds?: number[] | null;    source?: null | number;    sourceUrl?: null | string;    customerId?: null | number;    price?: null | string;    note?: null | string;    published?: null | boolean;    writerId?: null | number;    reserved?: null | boolean;    allowComment?: null | boolean;    timeless?: null | boolean;    rejected?: null | boolean;    premium?: null | boolean;    grade?: null | ArticleGradeEnum;    schedulePublish?: null | boolean;    scheduleDateTime?: null | string;    logDetail?: null | string;  }  export interface ArticleFilterInput {    siteId?: null | number;    type?: null | ArticleFilterEnum;    format?: null | ArticleFormatEnum;    isPremium?: null | boolean;    categoryId?: null | number;    categorySlug?: null | string;    categorySubId?: null | number;    categorySubSlug?: null | string;    exceptCategories?: number[] | null;    writerId?: null | number;    groupId?: null | number;    celebrityId?: null | number;    sourceId?: null | number;    tagId?: null | number;    title?: null | string;    date?: null | string;    startDate?: null | string;    endDate?: null | string;    startDateTime?: null | string;    endDateTime?: null | string;  }  export interface ArticleLogInput {    senderId?: null | number;    articleId?: null | number;    logDetail?: null | string;    logDateTime?: null | string;  }  export interface ArticleList {    data?: Article[] | null;    page?: null | Pagination;  }  export interface Article {    id: number;    siteId?: null | number;    title?: null | string;    summary?: null | string;    thumbnail?: null | string;    content?: null | string;    pageview?: null | number;    categoryId?: null | number;    categorySubId?: null | number;    categorySlug?: null | string;    categoryName?: null | NameFormat;    categoryNameSub?: null | NameFormat;    categorySubSlug?: null | string;    celebrityIds?: number[] | null;    tagIds?: number[] | null;    source?: null | number;    sourceUrl?: null | string;    price?: null | string;    note?: null | string;    published?: null | boolean;    reserved?: null | boolean;    allowComment?: null | boolean;    timeless?: null | boolean;    rejected?: null | boolean;    premium?: null | boolean;    grade?: null | string;    customer?: null | Customer;    invoiceId?: null | number;    invoiceNo?: null | string;    orderId?: null | number;    schedulePublish?: null | boolean;    createdDateTime?: null | string;    updatedDateTime?: null | string;    reservedDateTime?: null | string;    publishedDateTime?: null | NameFormat;    contentWriter?: null | ArticleAdmin;    publisher?: null | ArticleAdmin;    format?: null | ArticleFormatEnum;    isAuth?: null | boolean;    nextId?: null | number;  }  export interface ArticleAnalytic {    totalPageview?: null | number;    pageviewBySite?: PageviewBySite[] | null;    pageviewPerDay?: ArticlePageviewDate[] | null;    pageview24Hours?: null | number;    pageview24HoursPerHour?: ArticlePageviewTime[] | null;    averageTimeInSecond?: null | number;    readingHeatmap?: string[] | null;    totalBalance?: null | string;  }  export interface ArticlePageviewTime {    time?: null | number;    pageview?: null | number;  }  export interface ArticlePageviewDate {    date?: null | string;    pageview?: null | number;  }  export interface ArticleLogList {    logId?: null | number;    sender?: null | ArticleAdmin;    logDetail?: null | string;    logDateTime?: null | string;  }  export interface ArticleAdmin {    id?: null | number;    username?: null | string;    profilePicture?: null | string;    name?: null | NameFormat;    nameDisplay?: null | string;    groupId?: null | number;    groupName?: null | string;  }  export interface Writer {    id?: null | number;    nameDisplay?: null | string;    profilePicture?: null | string;    totalArticle?: null | number;    biography?: null | string;    AverageArticle?: null | number;    AverageShare?: null | number;    AverageLengthPerArticle?: null | number;  }  export interface ArticleTotal {    sources?: ArticleTotalCount[] | null;    total?: null | number;  }  export interface ArticleTotalByWriter {    contentWriter?: null | ArticleAdmin;    sources?: ArticleTotalCount[] | null;    total?: null | number;  }  export interface ArticleTotalCount {    id?: null | number;    name?: null | string;    total?: null | number;  }  export interface ArticleTotalEachCategory {    categoryName?: null | string;    contentWriter?: null | number;    contributor?: null | number;  }  export type ArticleFormatEnum = 'RAW_HTML' | 'JSON' | 'EDITOR_JS';  export type ArticleFilterEnum = 'PUBLISHED' | 'RESERVED' | 'TIMELESS';  export type ArticleSortEnum = 'PAGEVIEW' | 'CREATED' | 'RESERVED' | 'PUBLISHED';  export type ArticleGroupWriterEnum = 'INHOUSE_WRITER' | 'CONTENT_WRITER' | 'CONTRIBUTOR';  export type ArticleGradeEnum = 'A' | 'B' | 'C';  export interface CategoryList {    data?: Category[] | null;    page?: null | Pagination;  }  export interface Category {    id?: null | number;    parentId?: null | number;    alias?: null | string;    name?: null | NameFormat;    order?: null | number;    published?: null | boolean;    display?: null | boolean;    createdBy?: null | number;    createdDate?: null | string;    keywords?: null | string;    instantArticle?: null | boolean;  }  export interface ArticleSource {    articleSourceId?: null | number;    articleSourceName?: null | string;  }  export interface CelebrityList {    data?: Celebrity[] | null;    page?: null | Pagination;  }  export interface Celebrity {    id?: null | number;    name?: null | string;    photo?: null | string;    rankCurrent?: null | number;    rankOld?: null | number;  }  export interface TagList {    data?: Tag[] | null;    page?: null | Pagination;  }  export interface Tag {    id?: null | number;    name?: null | string;  }  export interface FashionModelInput {    modelName: string;    modelAvatar?: null | string;    modelDescription?: null | string;  }  export interface FashionPhotosInput {    modelId: number;    photos?: FashionPhotoInput[] | null;  }  export interface FashionPhotoInput {    photoUrl?: null | string;    photoCaption?: null | string;  }  export interface FashionPhotoFilter {    modelId?: null | number;  }  export interface FashionModel {    modelId?: null | number;    modelName?: null | string;    modelAvatar?: null | string;    modelDescription?: null | string;    createdBy?: null | number;    createdDateTime?: null | string;    updatedDateTime?: null | string;  }  export interface FashionPhoto {    photoId?: null | number;    modelId?: null | number;    photoUrl?: null | string;    photoCaption?: null | string;    createdBy?: null | number;    createdDateTime?: null | string;    updatedDateTime?: null | string;  }  export interface FashionModelList {    data?: FashionModel[] | null;    pagination?: null | Pagination;  }  export interface FashionPhotoList {    data?: FashionPhoto[] | null;    pagination?: null | Pagination;  }  export interface CustomerInput {    id?: null | number;    nameKH?: null | string;    nameEN?: null | string;    addressKH?: null | string;    addressEN?: null | string;    vatIn?: null | string;    phoneNumber?: null | string;    type?: null | CustomerType;  }  export interface Customer {    id?: null | number;    name?: null | NameFormat;    address?: null | NameFormat;    vatIn?: null | string;    phoneNumber?: null | string;    type?: null | string;  }  export interface CustomerList {    data?: Customer[] | null;    page?: null | Pagination;  }  export type CustomerType = 'SPECIAL' | 'GENERAL';  export interface reportContributor {    totalContributor?: null | number;    totalContributorActive?: null | number;  }  export interface reportArticle {    pageview?: null | number;    pageviewBySite?: PageviewBySite[] | null;    pageviewPerDay?: PageviewDateRange[] | null;    totalArticle?: null | number;    totalArticlePublished?: null | number;  }  export interface reportEditorPerformance {    pageview?: null | number;    pageviewBySite?: PageviewBySite[] | null;    pageviewPerDay?: PageviewDateRange[] | null;    totalArticlePublished?: null | number;  }  export interface DisbursementList {    data?: Disbursement[] | null;    page?: null | Pagination;  }  export interface Disbursement {    id?: null | number;    userRequest?: null | User;    amountBeforeTax?: null | string;    amountAfterTax?: null | string;    status?: null | DisbursementStatusEnum;    reason?: null | string;    proof?: null | string;    requestedDateTime?: null | string;  }  export interface DisbursementLogList {    data?: DisbursementLog[] | null;    page?: null | Pagination;  }  export interface DisbursementLog {    logId?: null | number;    userAction?: null | User;    logDetail?: null | string;    logDateTime?: null | string;  }  export interface DisbursementInput {    id?: null | number;    reason?: null | string;    proof?: null | string;  }  export type DisbursementStatusEnum = 'PROCESSING' | 'APPROVED' | 'REJECTED' | 'PAID';  export interface UpdateSettingInput {    articlePricePublish: string;    articlePricePublishGradeA: string;    articlePricePublishGradeB: string;    articlePricePublishGradeC: string;    articlePricePer1000Pageviews: string;    article24HoursThreshold: number;    disbursementThreshold: string;    commissionChiefEditor: string;    commissionEditor: string;  }  export interface Setting {    settingName?: null | string;    settingOption?: null | string;    settingValue?: null | string;  }}