/**
 * 鉴权相关接口
 */
export const AUTH = {
    sms: "/auth/sms",
    check: "/auth/check",
    regist: "/auth/regist",
    login: "/auth/login",
    logout: "/auth/logout",
    forget: "/auth/forget"
}

/**
 * 常规功能
 */
export const INDEX = {
    banner: "/banner",
    version: "/version"
}

/**
 * 交易相关接口
 */
export const ORDER = {
    list: "/order/list",
    detail: "/order/detail",
    accept: "/order/accept",
    refuse: "/order/refuse",
    confirm: "/order/confirm",
    recovery: "/order/recovery",
    failed: "/order/failed"
}

/**
 * 会员相关接口
 */
export const MEMBER = {
    detail: "/member/detail",
    switch: "/member/switch",
    cellphone: "/member/cellphone",
    wallet: "/member/wallet",
    update: "/member/update",
    password: "/member/password",
    pin: "/member/pin"
}

/**
 * 银行卡相关接口
 */
export const CARD = {
    list: "/card/list",
    add: "/card/add",
    update: "/card/update"
}

/**
 * 团队相关接口
 */
export const TEAM = {
    all_member_list: "/team/teamAllMemberList",
    level1_member_list: "/team/level1MemberList",
    level2_member_list: "/team/level2MemberList",
    level1_order_list: "/team/level1OrderList",
    level2_order_list: "/team/level2OrderList",
    report: "/team/report"
}

/**
 * 资金相关接口
 */
export const FINANCE = {
    list: "/finance/list",
    report: "/finance/report",
    detail: "/finance/detail",
    withdrawList: "/withdraw/list",
    withdrawApply: "/withdraw/apply"
}

/**
 * 站内信相关接口
 */
export const MSG = {
    list: "/msg/list",
    detail: "/msg/detail"
}