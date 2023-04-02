//@ts-nocheck
import global_config from "../assets/@config/global_config";
import * as cc_2 from 'cc';

export declare const asset: mk_asset;

export declare namespace asset_ {
    /** 加载配置 */
    export interface get_config<T extends cc_2.Asset = cc_2.Asset, T2 = T> {
        /** 资源类型 */
        type: cc_2.Constructor<T>;
        /** bundle 名（默认 resources） */
        bundle_s?: string;
        /** 进度回调 */
        progress_f?: (
        /** 当前进度 */
        current_n: number, 
        /** 总进度 */
        total_n: number) => void;
        /** 完成回调 */
        completed_f?: (error: Error | null, asset: T2) => void;
        /** 远程配置（存在配置则为远程资源） */
        remote_option?: _mk_asset.load_remote_option_type;
    }
    /** 加载文件夹配置 */
    export type get_dir_config<T extends cc_2.Asset> = get_config<T, T[]>;
}

export declare const audio: mk_audio_base;

export declare namespace audio_ {
    /** 音频状态 */
    export enum state {
        /** 停止 */
        stop = 1,
        /** 暂停 */
        pause = 2,
        /** 播放 */
        play = 4
    }
    /** 初始化配置 */
    export interface init_config {
        /** 类型枚举 */
        type: Record<string | number, string | number>;
        /** 组枚举 */
        group: Record<string | number, string | number>;
    }
    /** 安全音频单元 */
    export interface unit {
        /** 初始化状态 */
        readonly init_b: boolean;
        /** 分组 */
        readonly group_ns: ReadonlyArray<number>;
        /** 当前停止分组（停止时优先级最大的分组） */
        readonly stop_group_n: number | null;
        /** 播放状态 */
        readonly state: state;
        /** 等待播放次数（0-n：等待播放次数） */
        readonly wait_play_n: number;
        /** 总时长(秒) */
        readonly total_time_s_n: number;
        /** 事件对象 */
        readonly event: event_target<event_protocol>;
        /** 音频类型 */
        readonly type: number;
        /** 真实音量 */
        readonly real_volume_n: number;
        /** （common 使用）音频组件 */
        readonly audio_source?: cc_2.AudioSource;
        /** 音频资源 */
        clip: cc_2.AudioClip | null;
        /** 音量
         * - common：use_play_b 为 false 的情况下修改只能在下次 play 时生效
         */
        volume_n: number;
        /** 循环 */
        loop_b: boolean;
        /** 当前时间(秒) */
        curr_time_s_n: number;
        /**
         * （audio_common 使用）使用 play 接口，默认使用 playOneShot
         * - play 接口存在最大并发数限制 cc.AudioSource.maxAudioChannel
         * - playOneShot 接口不能暂停
         */
        use_play_b?: boolean;
        /** 等待播放开关 */
        wait_play_b?: boolean;
        /** 克隆 */
        clone<T extends this>(): T;
        /**
         * 克隆
         * @param value_n_ 克隆数量
         */
        clone<T extends this>(value_n_: number): T[];
    }
    /** add 配置 */
    export interface add_config {
        /** 分组 */
        group_ns?: number[];
        /** 文件夹 */
        dir_b?: boolean;
        /** 加载配置 */
        load_config: asset_.get_dir_config<cc_2.AudioClip>;
    }
    /** play 配置 */
    export interface play_config {
        /** 音量 */
        volume_n: number;
        /** 循环 */
        loop_b: boolean;
        /**
         * 使用 play 接口，默认使用 playOneShot
         * - play 接口存在最大并发数限制 cc.AudioSource.maxAudioChannel
         * - playOneShot 接口不能暂停
         */
        use_play_b: boolean;
    }
    /** 事件协议 */
    export interface event_protocol {
        /** 初始化 */
        init(): void;
        /** 播放 */
        play(): void;
        /** 暂停 */
        pause(): void;
        /** 恢复 */
        resume(): void;
        /** 中止 */
        stop(): void;
        /** 结束 */
        end(): void;
    }
    /** 音频单元 */
    export abstract class _unit {
        constructor(init_?: Partial<_unit>);
        /** 音频资源 */
        clip: cc_2.AudioClip | null;
        /** 音频类型 */
        type: global_config.audio.group;
        /** 事件对象 */
        _event?: event_target<event_protocol>;
        /** 分组 */
        group_ns: number[];
        /** 当前停止分组（停止时优先级最大的分组） */
        stop_group_n: number | null;
        /** 播放状态 */
        state: state;
        /** 等待播放次数（-1：关闭，0-n：等待播放次数） */
        wait_play_n: number;
        /** 真实音量 */
        real_volume_n: number;
        /** （common 使用）音频组件 */
        audio_source?: cc_2.AudioSource;
        /**
         * （common 使用）使用 play 接口，默认使用 playOneShot
         * - play 接口存在最大并发数限制 cc.AudioSource.maxAudioChannel
         * - playOneShot 接口不能暂停
         */
        use_play_b?: boolean;
        /** 初始化状态 */
        get init_b(): boolean;
        set init_b(value_b_: boolean);
        /** 音量
         * - common：use_play_b 为 false 的情况下修改只能在下次 play 时生效
         */
        get volume_n(): number;
        set volume_n(value_n_: number);
        /** 循环 */
        get loop_b(): boolean;
        set loop_b(value_b_: boolean);
        /** 总时长(秒) */
        get total_time_s_n(): number;
        /** 当前时间(秒) */
        get curr_time_s_n(): number;
        set curr_time_s_n(value_n_: number);
        /** 事件对象 */
        get event(): event_target<event_protocol>;
        /** 等待播放开关 */
        get wait_play_b(): boolean;
        set wait_play_b(value_b: boolean);
        /** 初始化状态 */
        protected _init_b: boolean;
        /** 更新音量 */
        abstract update_volume(): void;
        /** 克隆 */
        protected abstract _clone(): _unit;
        /** 克隆 */
        clone(): _unit;
        /**
         * 克隆
         * @param value_n_ 克隆数量
         */
        clone(value_n_: number): _unit[];
    }
    /** 音频组 */
    export class group {
        constructor(init_: mk_audio_base, priority_n_: number);
        /** 优先级（值越小优先级越大） */
        readonly priority_n: number;
        /** 音频列表 */
        audio_unit_as: ReadonlyArray<_unit>;
        /** 播放状态 */
        get play_b(): boolean;
        /** 停止状态 */
        get stop_b(): boolean;
        /** 音量 */
        get volume_n(): number;
        set volume_n(value_n_: number);
        /** 音频管理器 */
        private _audio_manage;
        /** 音量 */
        private _volume_n;
        /** 播放状态 */
        private _play_b;
        /** 停止状态 */
        private _stop_b;
        /**
         * 播放
         * @param contains_state_n_ 包含状态（处于这些状态中的音频将被播放，例：mk.audio_.state.pause | mk.audio_.state.stop）
         */
        play(contains_state_n_?: number): void;
        /** 暂停 */
        pause(): void;
        /**
         * 停止
         * - 停止后播放的音频将跳过
         */
        stop(state_b_?: boolean): void;
        /** 添加音频 */
        add_audio(audio_: unit | unit[]): void;
        /** 删除音频 */
        del_audio(audio_: unit | unit[]): void;
        /** 清理所有音频 */
        clear(): unit[];
        /**
         * 更新音频停止组
         * @param audio_ 音频单元
         * @param add_or_stop_b_ 添加或停止状态
         */
        private _update_stop_group;
    }
    const unit: Omit<unit, keyof Function> & (new (init_?: Partial<unit>) => Omit<unit, keyof Function>);
        {};
}

export declare const bundle: mk_bundle;

export declare namespace bundle_ {
    /** bundle 信息 */
    export class bundle_info {
        constructor(init_?: Partial<bundle_info>);
        /** bundle名（getBundle 时使用） */
        bundle_s: string;
        /** 版本 */
        version_s?: string;
        /** 资源路径（loadBundle 使用，默认为 bundle_s） */
        origin_s: string;
        /** 管理器 */
        manage?: bundle_manage_base;
    }
    /** load 配置 */
    export class load_config {
        constructor(init_?: Partial<load_config>);
        /** bundle名（getBundle 时使用） */
        bundle_s: string;
        /** 加载回调 */
        progress_callback_f?: (curr_n: number, total_n: number) => void;
    }
    /** switch_scene 配置 */
    export class switch_scene_config {
        constructor(init_?: Partial<switch_scene_config>);
        /** bundle名（getBundle 时使用） */
        bundle_s: string;
        /** 预加载 */
        preload_b?: boolean;
        /** 加载回调 */
        progress_callback_f?: (finish_n: number, total_n: number, item?: cc_2.AssetManager.RequestItem) => void;
        /** 加载前调用的函数 */
        before_load_callback_f?: cc_2.Director.OnBeforeLoadScene;
        /** 启动后调用的函数 */
        launched_callback_f?: cc_2.Director.OnSceneLaunched;
        /** 场景卸载后回调 */
        unloaded_callback_f?: cc_2.Director.OnUnload;
    }
    /** bundle 管理器基类 */
    export abstract class bundle_manage_base {
        constructor();
        /** bundle 名 */
        abstract name_s: string;
        /** 事件对象 */
        abstract event: event_target<any>;
        /** bundle 是否有效 */
        valid_b: boolean;
        /** 节点池表 */
        node_pool_tab: Record<string, cc_2.NodePool>;
        /** 网络对象 */
        network?: mk_network_base;
        /** 数据获取器 */
        data?: data_sharer;
        /** 初始化状态 */
        private _init_b;
        /** bundle 加载回调 */
        open(): boolean | null | Promise<boolean | null>;
        /** bundle 销毁回调 */
        close(): boolean | null | Promise<boolean | null>;
    }
}

/** 编解码器基类 */
export declare abstract class codec_base {
    constructor(option_?: codec_base_.config);
    /** 配置信息 */
    protected _config: codec_base_.config;
    /** 日志 */
    protected get _log(): logger;
    /** 日志 */
    private _log2?;
    /** 编码 */
    encode(...args_as_: any[]): any;
    /** 解码 */
    decode(...args_as_: any[]): any;
}

export declare namespace codec_base_ {
    /** 配置信息 */
    export class config {
        /** 加密函数 */
        encryption_f?: (data: any) => any;
        /** 解密函数 */
        decrypt_f?: (data: any) => any;
    }
}

/**
 * 数据共享器
 * - 用以模块间共享数据
 */
export declare class data_sharer<CT = any> extends instance_base {
    key: {
        [k in keyof CT]: k;
    };
    /** 数据表 */
    private _data_map;
    /** 请求表 */
    private _request_map;
    /**
     * 设置数据
     * @param key_ 注册键
     * @param data_ 数据
     */
    set<T extends keyof CT, T2 = CT[T]>(key_: CT, data_: T2): void;
    /**
     * 获取数据
     * @param key_ 注册键
     */
    get<T extends keyof CT, T2 = CT[T]>(key_: T): T2 | null;
    /**
     * 获取数据
     * @param key_ 注册键
     * @param request_ 请求数据（若不存在则等待 set 后返回）
     */
    get<T extends keyof CT, T2 extends true | false, T3 = CT[T]>(key_: T, request_: T2): T2 extends true ? Promise<T3> : T3 | null;
    /** 清空 */
    clear(): void;
}

declare const _default: mk_http;

export declare const dynamic_module: mk_dynamic_module;

export declare class event_target<CT> extends cc_2.EventTarget {
    key: {
        [k in keyof CT]: k;
    };
    on<T extends keyof CT, T2 extends (...event_: Parameters<CT[T]>) => void>(type_: T | T[], callback_: T2, this_?: any, once_b_?: boolean): typeof callback_ | null;
    once<T extends keyof CT, T2 extends (...event_: Parameters<CT[T]>) => void>(type_: T | T[], callback_: T2, this_?: any): typeof callback_ | null;
    off<T extends keyof CT, T2 extends (...event_: Parameters<CT[T]>) => void>(type_: T | T[], callback_?: T2, this_?: any): void;
    emit<T extends keyof CT, T2 extends Parameters<CT[T]>>(type_: T | T[], ...args_: T2): void;
    hasEventListener<T extends keyof CT, T2 extends (...event_: Parameters<CT[T]>) => void>(type_: T, callback_?: T2, target_?: any): boolean;
    clear(): void;
    /** 请求（等待返回） */
    request<T extends keyof CT, T2 extends Parameters<CT[T]>, T3 extends ReturnType<CT[T]>>(type_: T | T[], ...args_: T2): Promise<T3>[];
    /** 请求单个事件 */
    private _request_single;
}

export declare const game: mk_game;

/* Excluded from this release type: global_config */

declare namespace guide {
    export {
        mk_guide_step_base as step_base,
        mk_touch_mask as touch_mask,
        mk_polygon_mask as polygon_mask
    }
}
export { guide }

/** 引导管理器 */
export declare class guide_manage {
    constructor(init_: guide_manage_.init_config);
    /** 事件 */
    event: event_target<guide_manage_.event_protocol>;
    /** 暂停状态 */
    get pause_b(): boolean;
    set pause_b(value_b_: boolean);
    /** 日志 */
    private _log;
    /** 初始化配置 */
    private _init_config;
    /** 暂停状态 */
    private _pause_b;
    /** 上次步骤序号 */
    private _pre_step_n?;
    /** 当前步骤序号 */
    private _step_n;
    /** 任务管线 */
    private _task_pipeline;
    /** 步骤表 */
    private _step_map;
    /** 步骤预加载任务表 */
    private _step_preload_map;
    /**
     * 注册步骤
     * @param step_ 步骤实例
     */
    regis_step(step_: mk_guide_step_base | mk_guide_step_base[]): void;
    /** 运行（执行后恢复暂停状态，且更新当前步骤视图） */
    run(): Promise<void>;
    /**
     * 设置当前步骤（暂停状态只更新步骤数据，不会执行步骤生命周期）
     * @param step_n_ 步骤
     * @param init_data_ 初始化数据
     */
    set_step(step_n_: number, init_data_?: any): Promise<void>;
    /** 获取步骤 */
    get_step(): number;
    /** 完成引导 */
    finish(): void;
    private _set_pause_b;
}

export declare namespace guide_manage_ {
    /** 事件协议 */
    export interface event_protocol {
        /** 暂停 */
        pause(): void;
        /** 恢复 */
        resume(): void;
        /** 切换步骤（set_step 时执行） */
        switch(): void;
        /** 加载步骤（可在此处打开常驻节点遮罩） */
        loading_step(): void;
        /** 加载步骤结束（可在此处关闭常驻节点遮罩） */
        loading_step_complete(): void;
        /** 中断 */
        break(): void;
        /** 完成 */
        finish(): void;
    }
    export interface operate_cell {
        /** 加载 */
        load: () => any;
        /** 卸载 */
        unload?: () => any;
        /** 重置（上下步骤都存在当前操作时调用） */
        reset?: () => any;
    }
    /** 初始化配置 */
    export interface init_config {
        /** 结束步骤 */
        end_step_n?: number;
        /** 操作表 */
        operate_tab?: Record<string, operate_cell>;
        /** 引导名（用于打印） */
        name_s?: string;
        /**
         * 步骤更新回调
         * - 可在此内更新服务端数据并请求奖励
         * - 返回空（null | undefined）代表更新失败，中断引导
         * - 步骤可使用 this._server_data 获取返回数据
         */
        /**
         *
         * @param step_n
         * @returns 为空（null | undefined）代表更新失败中断引导，不为空则
         */
        step_update_callback_f(step_n: number): any;
    }
}

/** 继承单例 */
export declare abstract class instance_base {
    /** 单例方法 */
    static instance<T extends new (...args_as: any[]) => any>(this: T, ...args_as_: ConstructorParameters<T>): InstanceType<T>;
}

declare namespace language {
    export {
        mk_language_label as label,
        mk_language_texture as texture,
        mk_language_node as node
    }
}
export { language }

export declare namespace language_ {
    /** 多语言数据结构 */
    export type data_struct<T extends _mk_language_manage.type_type = any> = Record<T, Record<keyof typeof global_config.language.type, string>>;
    /** 获取文本配置 */
    export class label_config {
        constructor(init_?: Partial<label_config>);
        /** 语言类型 */
        language: global_config.language.type;
        /** 参数 */
        args_ss?: string[];
    }
    /** 多语言数据 */
    export abstract class base_data<CT extends data_struct> {
        constructor(init_: CT);
        /** 多语言键 */
        key: {
            [k in keyof CT]: k;
        };
        /** 多语言数据 */
        data: data_struct<keyof CT>;
    }
    /** 多语言纹理数据 */
    export class texture_data<CT extends data_struct> extends base_data<CT> {
        constructor(type_: string, init_: CT);
    }
    /** 多语言文本数据 */
    export class label_data<CT extends data_struct> extends base_data<CT> {
        constructor(type_: string, init_: CT);
    }
}

export declare const language_manage: mk_language_manage;

export declare class logger extends instance_base {
    constructor(name_s_: string);
    /** 日志等级 */
    static level_n: _mk_logger.level;
    /** 所有 log 对象 */
    private static _log_map;
    /** 日志缓存 */
    private static _cache_ss;
    /** 唯一日志模块 */
    private static _log_only_module_ss;
    /** 限制日志模块 */
    private static _limit_log_module_ss;
    /** 日志模块名 */
    private _name_s;
    /** 日志函数表 */
    private _log_func_tab;
    /** 计时信息 */
    private _time_map;
    /**
     * 初始化
     * @param error_handling_f_ 错误处理函数
     */
    static init(error_handling_f_?: (...args_as: any[]) => any): void;
    /** 只日志模块 */
    static log_only_module(module_ss_: string[]): void;
    /** 限制日志模块 */
    static limit_log_module(module_ss_: string[]): void;
    /** 调试打印 */
    static debug(...args_as_: any[]): void;
    /** 日志打印 */
    static log(...args_as_: any[]): void;
    /** 警告打印 */
    static warn(...args_as_: any[]): void;
    /** 错误打印 */
    static error(...args_as_: any[]): void;
    /** 堆栈打印 */
    static stack(): void;
    /**
     * 添加日志缓存
     * @param level_ 等级
     * @param head_s_ 日志头
     * @param args_as_ 参数
     * @returns
     */
    private static _add_log_cache;
    debug(...args_as_: any[]): void;
    log(...args_as_: any[]): void;
    warn(...args_as_: any[]): void;
    error(...args_as_: any[]): void;
    /** 计时开始 */
    time_start(name_s_: string, ...args_as_: any[]): void;
    /** 打印耗时 */
    time_log(name_s_: string, ...args_as_: any[]): void;
    /** 总耗时 */
    time_end(name_s_: string, ...args_as_: any[]): void;
    /** 日志头 */
    private _get_log_head;
    private _log;
}

export declare namespace logger_ {
    const level: typeof _mk_logger.level;
    export type level = _mk_logger.level;
}

/**
 * 资源管理器
 * - 资源默认引用为 2，引用为 1 时将在 global_config.resources.cache_lifetime_ms_n 时间后自动释放
 * - 统一加载接口为 get、get_dir
 */
declare class mk_asset extends instance_base {
    constructor();
    /** 初始化状态 */
    private static _init_b;
    /** 日志 */
    private _log;
    /** 管理表 */
    private _asset_manage_map;
    /** 释放表 */
    private _asset_release_map;
    /** 释放定时器 */
    private _release_timer;
    /**
     * 获取资源
     * @param path_s_ 资源路径
     * @param args2_ 资源类型 | 获取配置
     * @returns
     */
    get<T extends cc_2.Asset>(path_s_: string, args2_: cc_2.Constructor<T> | asset_.get_config<T>): Promise<T | null>;
    /** 获取文件夹资源 */
    get_dir<T extends cc_2.Asset>(path_s_: string, args2_: cc_2.Constructor<T> | asset_.get_dir_config<T>): Promise<T[] | null>;
    /**
     * 释放资源
     * @param asset_ 释放的资源
     */
    release(asset_: cc_2.Asset | cc_2.Asset[]): void;
    /** 资源初始化 */
    private _asset_init;
    /**
     * 自动释放资源
     * @param force_b_ 强制
     * @returns
     */
    private _auto_release_asset;
    private _event_restart;
}

declare namespace _mk_asset {
    /** loadRemote 配置类型 */
    type load_remote_option_type = cc_2.__private._cocos_core_asset_manager_shared__IRemoteOptions;
    /** loadAny 请求类型 */
    type load_any_request_type = cc_2.__private._cocos_core_asset_manager_shared__IRequest;
    /** 释放信息 */
    class release_info {
        constructor(init_?: Partial<release_info>);
        /** 添加时间 */
        join_time_ms_n: number;
        /** 资源 */
        asset: cc_2.Asset;
    }
}

/** 音频基类 */
declare abstract class mk_audio_base extends instance_base {
    constructor();
    /** 日志 */
    protected abstract _log: logger;
    /** 初始化数据 */
    protected _init_config?: audio_.init_config;
    /** 音频组 */
    protected _group_map: Map<number, audio_.group>;
    /** 暂停 */
    abstract pause(audio_: audio_.unit): void;
    /** 停止 */
    abstract stop(audio_: audio_.unit): void;
    /** 获取音频实例 */
    protected abstract _get_audio_unit<T extends audio_._unit>(init_?: Partial<audio_._unit>): T;
    /**
     * 初始化
     * @param config_ 初始化配置
     */
    init(config_: audio_.init_config): void;
    /** 获取组音频 */
    get_group(group_n_: number): audio_.group;
    /** 添加音频单元（添加后应该随视图自动释放） */
    add(url_s_: string, config_?: audio_.add_config): Promise<(audio_.unit & audio_.unit[]) | null>;
    add(url_ss_: string[], config_?: audio_.add_config): Promise<audio_.unit[] | null>;
    /**
     * 播放音效
     * @param audio_ 音频单元
     * @param config_ 播放配置
     * @returns
     */
    play(audio_: audio_.unit, config_?: Partial<audio_.play_config>): boolean;
    /** 暂停所有音频 */
    pause_all(): void;
    /** 恢复所有音频 */
    resume_all(): void;
    /** 停止所有音频 */
    stop_all(): void;
    /** 添加音频单元 */
    protected _add(audio_: audio_._unit, group_ns_?: ReadonlyArray<number>): boolean;
    private _event_restart;
}

/** bundle 管理 */
declare class mk_bundle extends instance_base {
    constructor();
    /** 事件 */
    event: event_target<_mk_bundle.event_protocol>;
    /** 上个场景bundle */
    pre_bundle_s?: string;
    /** 上个场景名 */
    pre_scene_s: string;
    /** bundle列表 */
    bundle_map: Map<string, bundle_.bundle_info>;
    /** 切换场景状态 */
    switch_scene_b: boolean;
    /** 当前场景bundle */
    get bundle_s(): string;
    set bundle_s(value_s_: string);
    /** 当前场景名 */
    get scene_s(): string;
    set scene_s(value_s: string);
    /** 初始化任务 */
    private _init_task;
    /** 引擎初始化任务 */
    private _engine_init_task;
    /** 日志 */
    private _log;
    /** 当前场景bundle */
    private _bundle_s;
    /** 当前场景名 */
    private _scene_s;
    /**
     * 添加bundle数据
     * @param info_ bundle 信息
     */
    add(info_: Partial<bundle_.bundle_info>): void;
    /**
     * 加载 bundle
     * @param args_ bundle 名 | 加载配置
     * @returns
     */
    load(args_: string | Partial<bundle_.load_config>): Promise<cc_2.AssetManager.Bundle | null>;
    /**
     * 切换场景
     * @param scene_s_ 场景名
     * @param config_ 切换配置
     * @returns
     */
    load_scene(scene_s_: string, config_?: Partial<bundle_.switch_scene_config>): Promise<boolean>;
    /** 重新加载 bundle */
    reload(info_: Partial<bundle_.bundle_info>): Promise<cc_2.AssetManager.Bundle | null>;
    private _set_bundle_s;
    private _set_scene_s;
}

declare namespace _mk_bundle {
    interface event_protocol {
        /** bundle 切换前事件 */
        before_bundle_switch(event: {
            /** 当前 bundle  */
            curr_bundle_s: string;
            /** 下个 bundle  */
            next_bundle_s: string;
        }): void;
        /** bundle 切换后事件 */
        after_bundle_switch(event: {
            /** 当前 bundle  */
            curr_bundle_s: string;
            /** 上个 bundle  */
            pre_bundle_s: string;
        }): void;
        /** 场景切换前事件 */
        before_scene_switch(event: {
            /** 当前场景 */
            curr_scene_s: string;
            /** 下个场景 */
            next_scene_s: string;
        }): void;
        /** 场景切换后事件 */
        after_scene_switch(event: {
            /** 当前场景 */
            curr_scene_s: string;
            /** 上个场景 */
            pre_scene_s: string;
        }): void;
    }
}

/** 动态模块（用以解除循环引用） */
declare class mk_dynamic_module extends instance_base {
    /**
     * 获取模块默认导出
     * @param module_ 动态模块
     * @returns
     */
    default<T extends Promise<any>>(module_: T): Awaited<T>["default"];
    /**
     * 获取模块所有导出
     * @param module_ 动态模块
     * @returns
     */
    all<T extends Promise<any>>(module_: T): Awaited<T>;
}

declare class mk_game extends instance_base {
    /** 重启中 */
    private _restarting_b;
    /** 重启中 */
    get restarting_b(): boolean;
    restart(): Promise<void>;
}

/** 引导步骤基类 */
declare abstract class mk_guide_step_base {
    /** 步骤序号 */
    abstract step_n: number;
    /** 所属场景（bundle.scene） */
    abstract scene_s: string;
    /** 引导管理器 */
    guide_manage: guide_manage;
    /** 操作键列表 */
    operate_ss: any[];
    /** 操作表返回值 */
    operate_tab: Record<PropertyKey, any>;
    /** 初始化数据 */
    init_data: any;
    /** 步骤更新返回数据 */
    step_update_data: any;
    /** 步骤描述（用于打印） */
    describe_s?: string;
    /** 下个步骤（用于预加载以及 this._next 跳转） */
    next_step_n?: number;
    /** 预加载（上个步骤 load 后执行） */
    pre_load?(): void | Promise<void>;
    /** 加载（进入当前步骤） */
    abstract load(): void | Promise<void>;
    /** 卸载（退出当前步骤） */
    unload?(): void | Promise<void>;
    /**
     * 跳转到下个步骤
     * @param init_data_ 下个步骤初始化数据
     * @returns
     */
    protected _next(init_data_?: any): void;
}

/** http */
declare class mk_http extends instance_base {
    /** 通用方法 */
    open(type_s_: "GET" | "POST", url_s_: string, config_?: Partial<mk_http_.config>): Promise<void>;
    /** GET方法 */
    get(url_s_: string, config_: Partial<mk_http_.config>): Promise<void>;
    /** POST方法 */
    post(url_s_: string, config_: Partial<mk_http_.config>): Promise<void>;
}

declare namespace mk_http_ {
    /** 配置信息 */
    class config {
        constructor(init_?: Partial<config>);
        /** 超时时间(ms) */
        timeout_n: number;
        /** 返回数据类型 */
        return_type?: XMLHttpRequestResponseType;
        /** 编解码器 */
        codec?: codec_base;
        /** 内容 */
        body?: Document | Blob | BufferSource | FormData | URLSearchParams | string;
        /** 标头 */
        header?: Record<string, string>;
        /** open后回调（可在内注册回调，设置请求数据） */
        open_callback_f?: (http: XMLHttpRequest) => void;
    }
}

declare abstract class mk_language_base extends cc_2.Component {
    /** 模糊匹配类型 */
    fuzzy_match_type_b: boolean;
    /** 类型 */
    get type_s(): string;
    set type_s(value_s_: string);
    /** 类型 */
    get type(): number;
    set type(value_: number);
    /** 模糊匹配语言标识 */
    fuzzy_match_mark_b: boolean;
    /** 语言标识 */
    get mark_s(): string;
    set mark_s(value_s_: string);
    /** 语言标识枚举 */
    get mark_enum(): number;
    set mark_enum(value_: number);
    /** 类型 */
    protected _type_s: string;
    /** 语言标识 */
    protected _mark_s: string;
    /** 当前类型数据 */
    protected _data?: language_.data_struct;
    /** 标记枚举数据 */
    protected _mark_enum?: any;
    /** 日志 */
    protected _log: logger;
    /** 更新内容 */
    protected abstract _update_content(): void;
    /** 更新标记 */
    protected abstract _update_mark(): void;
    /** 设置类型 */
    protected abstract _set_type(value_n_: number): void;
    /** 设置类型字符串（模糊匹配） */
    protected abstract _set_type_s(value_s_: string): void;
    /** 重置数据 */
    protected abstract _reset_data(): void;
    onLoad(): void;
    onEnable(): void;
    onDisable(): void;
    /** 初始化数据 */
    protected _init_data(): void;
    /** 初始化事件 */
    protected _init_event(state_b_: boolean): void;
    /** 设置标识 */
    protected _set_mark(value_s_: string): void;
    protected _set_mark_s(value_s_: string): void;
    protected _event_switch_language(): void;
}

declare class mk_language_label extends mk_language_base {
    /** 类型数组 */
    private static _type_ss;
    /** 注册类型 */
    private static _type_enum;
    get type(): number;
    set type(value_: number);
    /** 类型 */
    protected _type_s: string;
    /** 参数 */
    private _args_ss;
    /** 参数 */
    get args_ss(): string[];
    set args_ss(value_ss_: string[]);
    /** label组件 */
    private _label;
    /** 重置数据 */
    protected _reset_data(): void;
    protected _update_content(): void;
    protected _update_mark(): void;
    protected _set_type(value_: number): void;
    protected _set_type_s(value_s_: string): void;
    protected _init_data(): void;
    protected _init_event(state_b_: boolean): void;
    /** 初始化组件 */
    private _init_component;
    /** 更新编辑器 */
    private _update_editor;
    private _set_args_ss;
    private _event_label_data_change;
}

/** 多语言管理 */
declare class mk_language_manage extends instance_base {
    /** 事件 */
    event: event_target<_mk_language_manage.event_protocol>;
    /** 文本数据 */
    label_data_tab: Record<_mk_language_manage.type_type, language_.data_struct>;
    /** 纹理数据 */
    texture_data_tab: Record<_mk_language_manage.type_type, language_.data_struct>;
    /** 当前语言类型 */
    get type(): global_config.language.type;
    set type(value_: global_config.language.type);
    /** 日志 */
    private _log;
    /** 当前语言类型 */
    private _language;
    /**
     * 获取文本
     * @param type_ 类型
     * @param mark_s_ 标识
     * @param config_ 配置
     * @returns
     */
    get_label(type_: _mk_language_manage.type_type, mark_s_: string, config_?: Partial<language_.label_config>): string;
    /**
     * 获取纹理
     * @param type_ 类型
     * @param mark_s_ 标记
     * @param language_ 语言
     * @returns
     */
    get_texture(type_: _mk_language_manage.type_type, mark_s_: string, language_?: global_config.language.type): Promise<cc_2.SpriteFrame | null>;
    /**
     * 添加文本数据
     * @param type_ 类型
     * @param data_ 数据
     */
    add_label(type_: _mk_language_manage.type_type, data_: language_.data_struct): void;
    /**
     * 添加纹理数据
     * @param type_ 类型
     * @param data_ 数据
     */
    add_texture(type_: _mk_language_manage.type_type, data_: language_.data_struct): void;
    private _set_curr_type;
}

declare namespace _mk_language_manage {
    /** 多语言类型类型 */
    type type_type = string | number | symbol;
    /** 事件协议 */
    interface event_protocol {
        /** 切换语言 */
        switch_language(): void;
        /** 文本数据变更 */
        label_data_change(): void;
        /** 纹理数据变更 */
        texture_data_change(): void;
    }
}

/** 多语言节点 */
declare class mk_language_node {
    /** 语言 */
    language_s: string;
    /** 语言 */
    get language(): number;
    set language(value_n_: number);
    /** 当前语言节点 */
    private get _node();
    private set _node(value);
    /** 语言节点列表 */
    node_as: _mk_language_node.node[];
    /** 当前语言接单 */
    get node(): cc_2.Node;
    /** 初始化 */
    init(): void;
    /** 清理 */
    clear(): void;
    /** 更新节点展示 */
    private _update_view;
    private _event_switch_language;
}

declare namespace _mk_language_node {
    class node {
        constructor(init_?: Partial<node>);
        /** 语言 */
        get language(): number;
        set language(value_n_: number);
        /** 语言 */
        language_s: string;
        /** 节点 */
        node: cc_2.Node;
    }
}

declare class mk_language_texture extends mk_language_base {
    /** 类型数组 */
    private static _type_ss;
    /** 注册类型 */
    private static _type_enum;
    get type(): number;
    set type(value_n_: number);
    protected _type_s: string;
    /** sprite组件 */
    private _sprite;
    /** 重置数据 */
    protected _reset_data(): void;
    protected _update_content(): Promise<void>;
    protected _update_mark(): void;
    protected _set_type(value_: number): void;
    protected _set_type_s(value_s_: string): void;
    protected _init_data(): void;
    protected _init_event(state_b_: boolean): void;
    /** 初始化组件 */
    private _init_component;
    private _event_texture_data_change;
}

/** 层级管理 */
declare class mk_layer extends cc_2.Component {
    protected static _init_data?: mk_layer_.init_data;
    /** 初始化编辑器 */
    get init_editor(): void;
    /** 层类型 */
    layer_type_n: number;
    /** 层级 */
    get child_layer_n(): number;
    set child_layer_n(value_n_: number);
    /** 层级 */
    private _child_layer_n;
    private _ui_transform;
    /**
     * 初始化
     * @param data_ 初始化数据
     */
    static init(data_: mk_layer_.init_data): void;
    onLoad(): void;
    /** 初始化编辑器 */
    protected _init_editor(): void;
    /** 更新渲染优先级 */
    private _update_priority;
}

declare namespace mk_layer_ {
    /** 初始化数据 */
    interface init_data {
        /** 层级类型枚举 */
        layer_type: any;
        /** 层间隔 */
        layer_spacing_n: number;
    }
}

/**
 * 生命周期
 * - 用于模块生命周期控制
 */
declare class mk_life_cycle extends mk_layer {
    constructor(...args: any[]);
    /** 初始化数据 */
    init_data?: any;
    /** open状态 */
    get open_b(): boolean;
    /** 静态模块 */
    get static_b(): boolean;
    /** 设置模块配置 */
    set config(config_: _mk_life_cycle.create_config);
    /** 静态模块 */
    protected _static_b: boolean;
    /** load任务 */
    protected _load_task: mk_status_task<void>;
    /** open任务 */
    protected _open_task: mk_status_task<void>;
    /** 运行状态 */
    protected _state: _mk_life_cycle.run_state;
    /** 日志 */
    protected get _log(): logger;
    /** 日志 */
    private _log2;
    onLoad(): void;
    /**
     * 创建（可在此处初始化视图状态）
     * @param config_ 创建配置
     * - 静态模块：onLoad 时调用
     * - 动态模块：addChild 后调用
     */
    create?(): void | Promise<void>;
    /**
     * 初始化（所有依赖 init_data 初始化的逻辑都应在此进行）
     * @param data_ 初始化数据
     * - 静态模块：外部自行调用，常用于更新 item 或者静态模块
     * - 动态模块：onLoad 后，open 前调用
     */
    init(data_?: any): void | Promise<void>;
    /** 打开（init 后执行，在此处执行无需 init_data 支持的模块初始化操作） */
    open?(): void | Promise<void>;
    /** 关闭（可外部调用） */
    close?(): void | Promise<void>;
    /** 打开后 */
    protected _late_open?(): void | Promise<void>;
    /** 关闭后 */
    protected _late_close?(): void | Promise<void>;
    /* Excluded from this release type: _open */
    /* Excluded from this release type: _close */
    /** 递归 open */
    private _recursive_open;
    /** 递归 close */
    private _recursive_close;
}

declare namespace _mk_life_cycle {
    /** 运行状态 */
    enum run_state {
        /** 打开中 */
        opening = 1,
        /** 打开 */
        open = 2,
        /** 关闭中 */
        closing = 4,
        /** 关闭 */
        close = 8
    }
    /** 递归 open 配置 */
    interface recursive_open_config {
        /** 递归目标节点 */
        target: cc_2.Node;
        /** 激活状态 */
        active_b: boolean;
    }
    /** 递归 close 配置 */
    interface recursive_close_config {
        /** 递归目标节点 */
        target: cc_2.Node;
        /** 激活状态 */
        active_b: boolean;
        /** 销毁动态子节点（默认回收） */
        destroy_children_b?: boolean;
    }
    /** create 配置 */
    interface create_config {
        /** 静态模块 */
        static_b: boolean;
    }
    /** open 配置 */
    interface open_config {
        /** 首次 */
        first_b?: boolean;
        /** 初始化数据 */
        init?: any;
    }
    /** close 配置 */
    interface close_config {
        /** 首次调用 */
        first_b?: boolean;
        /** 销毁动态子节点（默认回收） */
        destroy_children_b?: boolean;
    }
}

declare namespace _mk_logger {
    enum level {
        /** 禁止所有日志输出 */
        none = 0,
        /** 调试 */
        debug = 1,
        /** 打印 */
        log = 2,
        /** 警告 */
        warn = 4,
        /** 错误 */
        error = 8,
        /** debug 及以上 */
        debug_up = 15,
        /** log 及以上 */
        log_up = 14,
        /** warn 及以上 */
        warn_up = 12
    }
    /** 计时日志 */
    interface time_log {
        /** 开始时间 */
        start_time_ms_n: number;
        /** 上次毫秒 */
        last_time_ms_n: number;
    }
}

/** 数据监听器 */
declare class mk_monitor extends instance_base {
    /** 日志管理 */
    private _log;
    /** 绑定数据图 */
    private _bind_data_map;
    /** 对象绑定数据图 */
    private _target_bind_data;
    /**
     * 监听数据更新
     * @param value_ 监听对象
     * @param key_ 监听键
     * @param on_callback_f_ on 触发回调
     * @param target_ 绑定对象
     */
    on<T, T2 extends keyof T>(value_: T, key_: T2, on_callback_f_: _mk_monitor.type_on_callback<T[T2]>, target_?: any): _mk_monitor.type_on_callback<T[T2]> | null;
    /**
     * 监听数据更新
     * @param value_ 监听对象
     * @param key_ 监听键
     * @param on_callback_f_ on 触发回调
     * @param off_callback_f_ off 触发回调
     * @param target_ 绑定对象
     */
    on<T, T2 extends keyof T>(value_: T, key_: T2, on_callback_f_: _mk_monitor.type_on_callback<T[T2]>, off_callback_f_: _mk_monitor.type_off_callback, target_?: any): _mk_monitor.type_on_callback<T[T2]> | null;
    /**
     * 监听单次数据更新
     * @param value_ 监听对象
     * @param key_ 监听键
     * @param on_callback_f_ on 触发回调
     * @param target_ 绑定对象
     */
    once<T, T2 extends keyof T>(value_: T, key_: T2, on_callback_f_: _mk_monitor.type_on_callback<T[T2]>, target_?: any): _mk_monitor.type_on_callback<T[T2]> | null;
    /**
     * 监听单次数据更新
     * @param value_ 监听对象
     * @param key_ 监听键
     * @param on_callback_f_ on 触发回调
     * @param off_callback_f_ off 触发回调
     * @param target_ 绑定对象
     */
    once<T, T2 extends keyof T>(value_: T, key_: T2, on_callback_f_: _mk_monitor.type_on_callback<T[T2]>, off_callback_f_: _mk_monitor.type_off_callback, target_?: any): _mk_monitor.type_on_callback<T[T2]> | null;
    /**
     * 取消监听数据更新
     * @param value_ 监听对象
     * @param key_ 监听键
     * @param target_ 绑定目标
     */
    off<T, T2 extends keyof T>(value_: T, key_: T2, target_?: any): Promise<void>;
    /**
     * 取消监听数据更新
     * @param value_ 监听对象
     * @param key_ 监听键
     * @param on_callback_f_ on 触发回调
     * @param target_ 绑定目标
     */
    off<T, T2 extends keyof T>(value_: T, key_: T2, on_callback_f_: _mk_monitor.type_on_callback<T[T2]>, target_?: any): Promise<void>;
    /**
     * 清理对象绑定的数据
     * @param target_ 绑定对象
     * @returns
     */
    clear(target_: any): void;
    /**
     * 启用 on 事件
     * @param target_ 绑定对象
     */
    enable(target_: any): void;
    /**
     * 启用 on 事件
     * @param value_ 监听对象
     * @param key_ 监听键
     * @param target_ 绑定对象
     */
    enable<T, T2 extends keyof T>(value_: T, key_: T2, target_?: any): void;
    /**
     * 启用 on 事件
     * @param value_ 监听对象
     * @param key_ 监听键
     * @param callback_f_ on 触发回调
     * @param target_ 绑定对象
     */
    enable<T, T2 extends keyof T>(value_: T, key_: T2, callback_f_: _mk_monitor.type_on_callback<T[T2]>, target_?: any): void;
    /**
     * 禁用 on 事件
     * @param target_ 绑定对象
     */
    disable(target_: any): void;
    /**
     * 禁用 on 事件
     * @param value_ 监听对象
     * @param key_ 监听键
     * @param target_ 绑定对象
     */
    disable<T, T2 extends keyof T>(value_: T, key_: T2, target_?: any): void;
    /**
     * 禁用 on 事件
     * @param value_ 监听对象
     * @param key_ 监听键
     * @param callback_f_ on 触发回调
     * @param target_ 绑定对象
     */
    disable<T, T2 extends keyof T>(value_: T, key_: T2, callback_f_: _mk_monitor.type_on_callback<T[T2]>, target_?: any): void;
    /** 获取绑定数据（没有则创建） */
    private _get_bind_data;
    /** 删除绑定数据 */
    private _del_bind_data;
    /** 添加对象绑定数据 */
    private _add_target_bind_data;
    /** 删除对象绑定数据 */
    private _del_target_bind_data;
    /** 监听数据更新 */
    private _on;
    /** 启用监听事件 */
    private _set_listener_state;
}

declare namespace _mk_monitor {
    /** 键类型 */
    type type_key = string | number | symbol;
    /** on 函数类型 */
    type type_on_callback<T> = (value_: T, old_value_?: T) => void;
    /** off 函数类型 */
    type type_off_callback = () => void;
    /** 监听数据类型 */
    type type_monitor_data<T> = {
        /** 监听回调 */
        on_callback_f: type_on_callback<T>;
        /** 取消监听回调 */
        off_callback_f?: type_off_callback;
        /** 绑定对象 */
        target?: any;
        /** 单次监听状态 */
        once_b?: boolean;
        /** 禁用状态 （仅用于 on_callback_f） */
        disabled_b?: boolean;
    };
    /** 对象绑定监听数据 */
    interface target_bind_monitor_data {
        /** 绑定监听 */
        monitor?: type_monitor_data<any>;
        /** 绑定对象 */
        target: any;
        /** 绑定键 */
        key: type_key;
    }
    /** 对象绑定数据 */
    interface target_bind_data {
        /** 绑定监听 */
        monitor_as?: target_bind_monitor_data[];
        /** 禁用状态 （仅用于 on_callback_f） */
        disabled_b?: boolean;
    }
    /** 绑定数据 */
    interface bind_data {
        /** 原始描述符 */
        desc: PropertyDescriptor;
        /** 绑定监听 */
        monitor_as?: type_monitor_data<any>[];
        /** 修改计数 */
        modify_count_n: number;
        /** 禁用状态 （仅用于 on_callback_f） */
        disabled_b?: boolean;
    }
}

declare abstract class mk_network_base<CT extends codec_base = codec_base> extends instance_base {
    constructor(init_?: Partial<mk_network_base_.init_config<CT>>);
    /** 网络事件 */
    event: event_target<_mk_network_base.event_protocol<CT>>;
    /** 消息事件 */
    message: _mk_network_base.message_event<CT>;
    /** 配置信息 */
    config: Readonly<mk_network_base_.init_config<CT>>;
    /** socket 状态 */
    get state(): mk_network_base_.status;
    /** 编解码器 */
    get codec(): CT | undefined;
    set codec(value_: CT | undefined);
    /** socket */
    protected abstract _socket: any;
    /** 日志 */
    protected _log: logger;
    /** socket 状态 */
    protected _state: mk_network_base_.status;
    /** 地址 */
    protected _addr_s: string;
    /* Excluded from this release type: _write_sleep2_b */
    /** 写入队列 */
    protected _write_as: any[];
    /** 重连计数 */
    private _reconnect_count_n;
    /** 重连定时器 */
    private _reconnect_timer;
    /** 发送定时器 */
    private _send_timer;
    /** 等待任务表 */
    private _wait_task_map;
    /** 写睡眠状态 */
    private get _write_sleep_b();
    private set _write_sleep_b(value);
    /** 重置 socket */
    protected abstract _reset_socket(): void;
    /** 连接 */
    connect(addr_s_: string): void;
    /** 断开 */
    close(): void;
    /* Excluded from this release type: _send */
    /* Excluded from this release type: _wait */
    /** socket 准备完成 */
    protected _open(event_: any): void;
    /** socket 消息 */
    protected _message(event_: any): Promise<void>;
    /** socket 错误 */
    protected _error(event_: any): void;
    /** socket 关闭 */
    protected _close(event_: any): void;
    /** 定时发送 */
    protected _timer_send(): Promise<void>;
    /** 定时重连 */
    protected _timer_reconnect(): void;
    /**
     * 取消重连
     * @param status_b_ 成功 | 失败
     * @returns
     */
    protected _cancel_reconnect(status_b_: boolean): void;
    /**
     * 触发等待任务
     * @param data_ 收到的消息
     * @returns
     */
    protected _trigger_wait_task(data_: any): void;
    /** 初始化心跳 */
    protected _start_heartbeat(): void;
    protected _set_write_sleep_b(value_b_: boolean): void;
    protected _event_restart(): void;
}

declare namespace _mk_network_base {
    /** 从 T 中排除 null, undefined, void */
    type NonVoid<T> = T extends null | undefined | void ? never : T;
    /** 消息协议 */
    interface event_protocol<T extends codec_base = codec_base> {
        /** 网络连接 */
        open(): void;
        /**
         * 网络断开
         * @param event socket 事件
         */
        close(event: any): void;
        /** 重连失败 */
        reconnect_fail(): void;
        /** 心跳超时（只会在接收心跳超时时通知） */
        heartbeat_timeout(): void;
        /**
         * 收到任意消息
         * @param data 收到的消息
         */
        recv(data: NonVoid<ReturnType<T["decode"]>>): void;
    }
    /** 消息事件 */
    class message_event<CT extends codec_base = codec_base> extends cc_2.EventTarget {
        constructor(network_: mk_network_base);
        /** 网络实例 */
        private _network;
        /** 日志 */
        private _log;
        on<T extends cc_2.Constructor<global_config.network.proto_head> | string | number, T2 extends (event_: T["prototype"]) => void>(type_: T, callback_: T2, this_?: any, once_b_?: boolean): typeof callback_ | null;
        once<T extends cc_2.Constructor<global_config.network.proto_head> | string | number, T2 extends (event_: T["prototype"]) => void>(type_: T, callback_: T2, this_?: any): typeof callback_ | null;
        off<T extends cc_2.Constructor<global_config.network.proto_head> | string | number, T2 extends (event_: T["prototype"]) => void>(type_: T, callback_?: T2, this_?: any): void;
        /** 派发事件（接收消息后派发，可用此接口模拟数据） */
        emit<T extends global_config.network.proto_head>(data_: T): void;
        emit<T extends string | number>(type_: T, data_: any): void;
        /**
         * 发送
         * @param data_ 发送数据
         * @returns
         */
        send<T = Parameters<CT["encode"]>[0]>(data_: T): void;
        /**
         * 请求（等待返回）
         * @param data_ 发送数据
         * @param timeout_ms_n_ 超时时间
         * @returns
         */
        request<T extends Parameters<CT["encode"]>[0]>(data_: T, timeout_ms_n_?: number): Promise<any> | null;
        hasEventListener<T extends cc_2.Constructor<global_config.network.proto_head> | string | number, T2 extends (event_: T["prototype"]) => void>(type_: T, callback_?: T2, target_?: any): boolean;
        clear(): void;
    }
        {};
}

declare namespace mk_network_base_ {
    /** 状态类型 */
    enum status {
        /** 连接中 */
        connecting = 0,
        /** 已连接 */
        open = 1,
        /** 关闭中 */
        closing = 2,
        /** 已关闭 */
        closed = 3
    }
    /** 初始化配置 */
    class init_config<CT extends codec_base = codec_base> {
        constructor(init_?: Partial<init_config<CT>>);
        /** 编解码器 */
        codec?: CT;
        /** 发送间隔（毫秒） */
        send_interval_ms_n: number;
        /** 重连间隔（毫秒） */
        reconnect_interval_ms_n: number;
        /** 最大重连次数 */
        max_reconnect_n: number;
        /** 等待消息超时时间（毫秒） */
        wait_timeout_ms_n: number;
        /** 心跳配置 */
        heartbeat_config?: {
            /** 发送间隔（毫秒） */
            interval_ms_n?: number;
            /** 超时时间 */
            timeout_ms_n: number;
            /**
             * 初始化
             * @param done_f 接收到心跳后手动调用（server -> client），用于心跳超时检测
             * @returns 返回心跳数据的函数（client -> server），不为空则向服务器定时发送
             */
            init_f(done_f: () => void): null | (() => any);
        };
        /**
         * 解析消息 id
         * @param data 接收的消息
         * @returns 消息号
         */
        parse_message_id_f(data: any): string | number;
        /**
         * 解析消息序列号
         * @param data 接收的消息
         * @returns 消息序列号
         */
        parse_message_sequence_f(data: any): string | number | undefined;
    }
    /** 发送潮 */
    class send_tide<CT extends codec_base = codec_base> {
        /**
         * @param network_ 网络实例
         * @param interval_ms_n_ 发送间隔（-1：手动触发，0-n：自动发送间隔毫秒）
         */
        constructor(network_: mk_network_base, interval_ms_n_: number);
        /** 网络节点 */
        private _network;
        /** 发送间隔（-1：手动触发，>0：自动发送间隔毫秒） */
        private _send_interval_ms_n;
        /** 消息列表 */
        private _mess_as;
        /** 发送倒计时 */
        private _send_timer;
        /** 发送 */
        send(data_: Parameters<CT["encode"]>[0]): void;
        /** 触发发送 */
        trigger(): void;
    }
}

declare namespace _mk_obj_pool {
    /** 配置 */
    class config<CT> {
        constructor(init_?: config<CT>);
        /** 返回新对象 */
        create_f: () => CT | Promise<CT>;
        /**
         * 重置对象
         * @remarks
         * 在 create_f 后以及 put 时调用
         */
        reset_f?: (obj: CT, create_b: boolean) => CT | Promise<CT>;
        /** 释放回调 */
        clear_f?: (obj_as: CT[]) => void | Promise<void>;
        /**
         * 剩余对象池数量不足时扩充数量
         * @defaultValue 32
         */
        fill_n?: number | undefined;
        /**
         * 最大保留数量
         * @remarks
         * 可节省内存占用，-1为不启用
         * @defaultValue
         * -1
         */
        max_hold_n?: number | undefined;
        /**
         * 初始化扩充数量
         * @defaultValue
         * 0
         */
        init_fill_n?: number | undefined;
    }
    /** 同步模块 */
    namespace sync {
        /** 配置 */
        class config<CT> {
            constructor(init_?: config<CT>);
            /** 返回新对象 */
            create_f: () => CT;
            /**
             * 重置对象
             * @remarks
             * 在 create_f 后以及 put 时调用
             */
            reset_f?: (obj: CT, create_b: boolean) => CT;
            /** 释放回调 */
            clear_f?: (obj_as: CT[]) => void;
            /**
             * 剩余对象池数量不足时扩充数量
             * @defaultValue 32
             */
            fill_n?: number | undefined;
            /**
             * 最大保留数量
             * @remarks
             * 可节省内存占用，-1为不启用
             * @defaultValue
             * -1
             */
            max_hold_n?: number | undefined;
            /**
             * 初始化扩充数量
             * @defaultValue
             * 0
             */
            init_fill_n?: number | undefined;
        }
    }
}

/**
 * 多边形遮罩
 * - 跟踪节点父节点不能变更，否则可能会导致坐标错误
 */
declare class mk_polygon_mask extends cc_2.Component {
    get init_editor(): void;
    /** 跟踪节点 */
    get track_node(): cc_2.Node;
    set track_node(value_: cc_2.Node);
    /** 跟踪节点 */
    private _track_node;
    /** 跟踪节点初始坐标 */
    private _track_node_start_pos_v3;
    /** 遮罩组件 */
    private _mask;
    /** 多边形点 */
    private _point_v2s;
    /** 碰撞多边形点 */
    private _point2_v2s;
    onLoad(): void;
    /** 更新遮罩 */
    private _update_mask;
    /** 初始化编辑器 */
    private _init_editor;
    private _set_track_node;
}

/** 场景驱动 */
declare class mk_scene_drive extends mk_life_cycle {
    private _close_task;
    onLoad(): Promise<void>;
    onDestroy(): void;
    private _event_restart;
    private _event_wait_close_scene;
    private _event_before_scene_switch;
}

/** 状态任务 */
declare class mk_status_task<CT = void> {
    /**
     * @param finish_b_ 完成状态
     * @param init_config_ 初始化配置
     */
    constructor(finish_b_: boolean, init_config_?: mk_status_task_.init_config<CT>);
    /** 异步任务 */
    task: Promise<CT>;
    /** 完成状态（true：任务结束，false：任务进行中） */
    get finish_b(): boolean;
    /** 完成状态 */
    private _finish_b;
    /** 完成回调 */
    private _finish_f;
    /** 初始化配置 */
    private _init_config?;
    /** 超时倒计时 */
    private _timeout_timer;
    /**
     * 完成任务
     * @param finish_b_ 完成状态
     */
    finish<T extends false>(finish_b_: T): void;
    /**
     * 完成任务
     * @param finish_b_ 完成状态
     * @param data_ 完成数据
     */
    finish<T extends true>(finish_b_: T, data_: CT): void;
    /** 重置 */
    private _reset;
}

declare namespace mk_status_task_ {
    /** 初始化配置 */
    interface init_config<T> {
        /** 超时时间 */
        timeout_ms_n?: number;
        /** 超时返回数据 */
        timeout_return?: T;
    }
}

declare namespace mk_storage_ {
    interface init_config<CT extends Object> {
        /** 存储器名 */
        name_s: string;
        /** 存储数据 */
        data: CT;
        /** 编解码器 */
        codec?: codec_base;
    }
}

/** 任务管线（顺序执行任务） */
declare class mk_task_pipeline {
    /** 事件 */
    event: event_target<_mk_task_pipeline.event_protocol>;
    /** 暂停状态 */
    get pause_b(): boolean;
    set pause_b(value_b_: boolean);
    /** 执行状态 */
    private _run_b;
    /** 暂停状态 */
    private _pause_b;
    /** 任务列表 */
    private _task_as;
    /**
     * 添加任务
     * @param task_f_ 任务函数
     * @returns 当前任务 Promise
     */
    add(task_f_: Function): Promise<void>;
    /** 执行任务 */
    private _run;
}

declare namespace _mk_task_pipeline {
    /** 事件协议 */
    interface event_protocol {
        /** 执行完成 */
        completed(): void;
    }
    /** 任务数据 */
    interface task_data {
        /** 执行函数 */
        task_f: Function;
        /** 状态任务 */
        task: mk_status_task;
    }
}

/**
 * 触摸遮罩
 * - 跟踪节点父节点不能变更，否则可能会导致坐标错误
 */
declare class mk_touch_mask extends cc_2.Component {
    /** 跟踪节点 */
    get track_node(): cc_2.Node;
    set track_node(value_: cc_2.Node);
    /** 跟踪节点 */
    private _track_node;
    /** 跟踪节点初始坐标 */
    private _track_node_start_pos_v3;
    /** 输入事件 */
    private _input_event_as;
    /** 多边形点 */
    private _point_v2s;
    /** 碰撞多边形点 */
    private _point2_v2s;
    /** 临时变量 */
    private _temp_tab;
    onLoad(): void;
    onEnable(): void;
    onDisable(): void;
    private _set_track_node;
    private _event_input;
}

declare class mk_ui_manage extends instance_base {
    constructor();
    /** 初始化状态 */
    private static _init_b;
    /**
     * 获取模块注册数据
     * @remarks
     * open 未注册模块时会使用此函数获取注册数据自动注册
     */
    get_regis_data_f?: <T extends cc_2.Constructor<mk_view_base>>(key: T) => ui_manage_.regis_data<T>;
    /** 日志 */
    private _log;
    /** 模块注册表 */
    private _ui_regis_map;
    /** 模块注册任务表（用于 open 时等待注册） */
    private _ui_regis_task_map;
    /** 模块加载表（用于检测重复加载） */
    private _ui_load_map;
    /** 模块对象池 */
    private _ui_pool_map;
    /** 隐藏模块列表长度 */
    private _ui_hidden_length_n;
    /** 模块隐藏集合 */
    private _ui_hidden_set;
    /** 当前展示模块列表 */
    private _ui_show_as;
    /** 当前模块列表表 */
    private _ui_map;
    /**
     * 注册模块
     * @param key_ 模块名
     * @param source_ 模块来源
     * @param config_ 模块配置
     * @returns
     */
    regis<T extends cc_2.Constructor<mk_view_base>>(key_: T, source_: _mk_ui_manage.source_type<T>, config_?: Partial<ui_manage_.regis_config<T>>): Promise<void>;
    /**
     * 取消注册模块
     * @param key_ 模块键
     * @returns
     */
    unregis<T extends cc_2.Constructor<mk_view_base>>(key_: T): Promise<void>;
    /** 获取所有模块 */
    get(): ReadonlyArray<mk_view_base>;
    /**
     * 获取指定模块
     * @param key_ 模块键
     * @param type_ 模块类型
     */
    get<T extends cc_2.Constructor<mk_view_base>, T2 = T["prototype"]>(key_: T, type_?: T["type_s"]): T2 | null;
    /**
     * 获取指定模块列表
     * @param key_ 模块键列表 [type]
     * @param type_ 模块类型
     */
    get<T extends cc_2.Constructor<mk_view_base>, T2 = T["prototype"]>(key_: T[], type_?: T["type_s"]): ReadonlyArray<T2>;
    /**
     * 打开模块
     * @param key_ 模块类型，必须经过 {@inheritdoc mk_ui_manage.regis} 接口注册过
     * @returns
     */
    open<T extends cc_2.Constructor<mk_view_base>, T2 = T["prototype"]>(key_: T, config_?: ui_manage_.open_config<T>): Promise<T2 | null>;
    /**
     * 关闭 ui
     * @param args_ 节点/模块类型/模块实例
     * @param config 配置
     * @returns
     */
    close<T extends cc_2.Constructor<mk_view_base>, T2 extends mk_view_base>(args_: cc_2.Node | T | T2, config_?: ui_manage_.close_config<T>): Promise<boolean>;
    private _event_restart;
}

declare namespace _mk_ui_manage {
    type source_type<T extends {
        type_s?: string;
    } | {}> = cc_2.Prefab | string | cc_2.Node | (T extends {
        type_s: string;
    } ? Record<T["type_s"], cc_2.Prefab | string | cc_2.Node> & {
        default: cc_2.Prefab | string | cc_2.Node;
    } : never);
}

/** 视图基类 */
declare class mk_view_base extends mk_life_cycle {
    protected static _init_data: mk_view_base_.init_data & mk_view_base_.init_config;
    /** 窗口 */
    get wind_b(): boolean;
    set wind_b(value_b_: boolean);
    wind_config: _mk_view_base.wind_config;
    show_alone_b: boolean;
    get auto_mask_b(): boolean;
    set auto_mask_b(value_b_: boolean);
    get auto_widget_b(): boolean;
    set auto_widget_b(value_b_: boolean);
    get auto_block_input_b(): boolean;
    set auto_block_input_b(value_b_: boolean);
    /** 视图数据（如果是 class 类似会在 close 后自动重置，根据 this._reset_data_b 控制） */
    data?: any;
    /** 视图类型 */
    get type_s(): string;
    /** 模块配置 */
    set config(config_: _mk_view_base.create_config);
    /** 重置 data（close 后重置 this.data，data 必须为 class） */
    protected _reset_data_b: boolean;
    /** 视图配置 */
    protected _view_config: mk_view_base_.view_config;
    /** 窗口 */
    private _wind_b;
    /** 引用节点 */
    private _quote_node_as;
    /** 引用资源 */
    private _quote_asset_as;
    /** 引用对象 */
    private _quote_object_as;
    /**
     * 初始化
     * @param data_ 初始化数据
     */
    static init(data_: mk_view_base_.init_data, config_?: Partial<mk_view_base_.init_config>): void;
    open(): void | Promise<void>;
    /**
     * 关闭
     * @param config_ 关闭配置
     */
    close(config_?: Omit<ui_manage_.close_config<any>, "type" | "all_b">): void | Promise<void>;
    protected _late_close?(): Promise<void>;
    /** 自动释放 */
    auto_release<T extends cc_2.Node | cc_2.Node[]>(args_: T): T;
    auto_release<T extends cc_2.Asset | cc_2.Asset[]>(args_: T): T;
    auto_release<T extends _mk_view_base.release_object_type | _mk_view_base.release_object_type[]>(args_: T): T;
    /** 初始化编辑器 */
    protected _init_editor(): void;
    private _set_wind_b;
    private _get_auto_mask_b;
    private _set_auto_mask_b;
    private _set_auto_widget_b;
    private _set_auto_block_input_b;
}

declare namespace _mk_view_base {
    /** 释放对象类型 */
    type release_object_type = {
        clear(): void;
    };
    /** create 配置 */
    interface create_config extends _mk_life_cycle.create_config {
        /** 视图配置 */
        view_config: mk_view_base_.view_config;
    }
    /** 窗口配置 */
    class wind_config {
        /** 窗口动画枚举表 */
        static animation_enum_tab: {
            /** 打开动画 */
            open: Record<string | number, string | number>;
            /** 关闭动画 */
            close: Record<string | number, string | number>;
        };
        get open_animation_n(): number;
        set open_animation_n(value_n_: number);
        get close_animation_n(): number;
        set close_animation_n(value_n_: number);
        /** 窗口打开动画 */
        open_animation_s: string;
        /** 窗口关闭动画 */
        close_animation_s: string;
    }
}

declare namespace mk_view_base_ {
    /** 初始化数据 */
    type init_data = mk_layer_.init_data;
    /** 初始化配置 */
    interface init_config {
        /** 遮罩节点名 */
        mask_node_name_s?: string;
        /** 遮罩预制体路径 */
        mask_prefab_path_s?: string;
        /** 窗口动画 */
        window_animation_tab?: {
            /** 打开动画 */
            open?: Record<string, (value: cc_2.Node) => void | Promise<void>>;
            /** 关闭动画 */
            close?: Record<string, (value: cc_2.Node) => void | Promise<void>>;
        };
    }
    class view_config {
        constructor(init_?: Partial<view_config>);
        /** 所有预制体路径|资源 */
        prefab_tab?: Record<string, cc_2.Prefab | string> & {
            default: cc_2.Prefab | string;
        };
        /** 模块类型 */
        type_s: string;
    }
}

/** websocket */
declare class mk_websocket<CT extends codec_base = codec_base> extends mk_network_base<CT> {
    constructor(config_?: Partial<mk_websocket_.init_config<CT>>);
    config: Readonly<mk_websocket_.init_config<CT>>;
    protected _socket: WebSocket;
    /** 重置socket */
    protected _reset_socket(): void;
}

declare namespace mk_websocket_ {
    class init_config<CT extends codec_base = codec_base> extends mk_network_base_.init_config<CT> {
        constructor(init_?: Partial<init_config<CT>>);
        /** 通信类型 */
        binaryType: "blob" | "arraybuffer";
        /** 协议 */
        protocol_ss: string[];
    }
}

/** websocket_wx */
declare class mk_websocket_wx<CT extends codec_base = codec_base> extends mk_network_base<CT> {
    constructor(config_?: Partial<mk_websocket_wx_.init_config<CT>>);
    config: Readonly<mk_websocket_wx_.init_config<CT>>;
    protected _socket: wx.SocketTask;
    /** 重置socket */
    protected _reset_socket(): void;
}

declare namespace mk_websocket_wx_ {
    class init_config<CT extends codec_base = codec_base> extends mk_network_base_.init_config<CT> {
        constructor(init_?: Partial<init_config<CT>>);
        /** 协议 */
        protocol_ss: string[];
    }
}

declare namespace module_2 {
    export {
        mk_layer as layer,
        mk_layer_ as layer_,
        mk_life_cycle as life_cycle,
        mk_scene_drive as scene_drive,
        mk_view_base as view_base,
        mk_view_base_ as view_base_
    }
}
export { module_2 as module }

export declare const monitor: mk_monitor;

declare namespace network {
    export {
        mk_websocket as websocket,
        mk_websocket_ as websocket_,
        mk_websocket_wx as websocket_wx,
        _default as http,
        mk_http_ as http_,
        mk_network_base as base,
        mk_network_base_ as base_
    }
}
export { network }

/** 对象池（异步） */
export declare class obj_pool<CT> {
    constructor(init_: _mk_obj_pool.config<CT>);
    /** 对象存储列表 */
    private _obj_as;
    /** 初始化数据 */
    private _init_data;
    /**
     * 导入对象
     * @param obj_ 添加对象
     * @returns
     */
    put(obj_: any): Promise<void>;
    /** 获取对象 */
    get(): Promise<CT>;
    /** 清空数据 */
    clear(): Promise<void>;
    /** 添加对象 */
    private _add;
    /** 删除对象 */
    private _del;
}

export declare namespace obj_pool {
    /** 对象池（同步） */
    export class sync<CT> {
        constructor(init_?: _mk_obj_pool.sync.config<CT>);
        /** 对象存储列表 */
        private _obj_as;
        /** 初始化数据 */
        private _init_data;
        /** 导入对象 */
        put(obj_: CT): void;
        /** 获取对象 */
        get(): CT;
        /** 清空数据 */
        clear(): void;
        /** 添加对象 */
        private _add;
        /** 删除对象 */
        private _del;
    }
}

/** 存储器 */
export declare class storage<CT extends Object> {
    constructor(init_: mk_storage_.init_config<CT>);
    /** 存储数据键 */
    key: {
        [k in keyof CT]: k;
    };
    /** 初始化配置 */
    private _init_config;
    /** 缓存数据 */
    private _cache;
    /** 当前存储路径 */
    private get _storage_path_s();
    /** 清空所有存储器数据 */
    static clear(): void;
    /**
     * 设置存储数据
     * @param key_ 存储键
     * @param data_ 存储数据
     * @param effective_time_ms_n_ 失效时间
     * @returns storage.status
     */
    set<T extends keyof CT>(key_: T, data_: any): boolean;
    /**
     * 获取数据
     * @param key_ 存储键
     * @returns
     */
    get<T extends keyof CT, T2 extends CT[T]>(key_: T): T2;
    /**
     * 删除数据
     * @param key_ 存储键
     */
    del<T extends keyof CT>(key_: T): void;
    /** 清空当前存储器数据 */
    clear(): void;
}

declare namespace task {
    export {
        mk_status_task as status,
        mk_task_pipeline as pipeline
    }
}
export { task }

export declare const ui_manage: mk_ui_manage;

export declare namespace ui_manage_ {
    /** 关闭ui配置 */
    export class close_config<CT extends cc_2.Constructor<mk_view_base>> {
        constructor(init_?: close_config<CT>);
        /** 类型 */
        type?: CT["type_s"];
        /** 关闭全部指定类型的模块 */
        all_b?: boolean;
        /** 销毁节点 */
        destroy_b?: boolean;
        /** 销毁动态子节点
         * @defaultValue
         * destroy_b
         */
        destroy_children_b?: boolean;
    }
    /** 打开ui配置 */
    export class open_config<CT extends cc_2.Constructor<mk_view_base>> {
        constructor(init_?: open_config<CT>);
        /** 初始化数据 */
        init?: CT["init_data"];
        /** 类型 */
        type?: CT["type_s"];
        /** 父节点 */
        parent?: cc_2.Node;
    }
    /** 模块注册配置 */
    export class regis_config<CT extends cc_2.Constructor<mk_view_base>> {
        constructor(init_?: Partial<regis_config<CT>>);
        /**
         * 重复打开
         * @defaultValue
         * false
         */
        repeat_b: boolean;
        /** 默认父节点（默认 canvas 节点） */
        /**
         * 默认父节点
         * @defaultValue
         * Canvas 节点
         */
        parent: cc_2.Node | undefined;
        /** 加载配置 */
        load_config?: asset_.get_config<cc_2.Prefab>;
        /**
         * 对象池数量不足时扩充数量
         * @defaultValue
         * this.repeat_b ? 8 : 1
         */
        pool_fill_n: number;
        /**
         * 对象池最大保留数量
         * @defaultValue
         * -1: 不启用
         */
        pool_max_hold_n: number;
        /**
         * 对象池初始化扩充数量
         * @defaultValue
         * 1
         */
        pool_init_fill_n: number;
    }
    /** 模块注册数据 */
    export class regis_data<CT extends cc_2.Constructor<mk_view_base>> extends regis_config<CT> {
        constructor(init_?: Partial<regis_data<CT>>);
        /** 来源 */
        source: _mk_ui_manage.source_type<CT>;
    }
}

export { }