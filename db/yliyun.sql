/*==============================================================*/
/* Database name:  yliyun                                       */
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2015/6/29 16:14:45                           */
/*==============================================================*/


drop database if exists yliyun;

/*==============================================================*/
/* Database: yliyun                                             */
/*==============================================================*/
create database yliyun DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;

use yliyun;

/*==============================================================*/
/* Table: department                                            */
/*==============================================================*/
create table department
(
   dept_id              bigint not null comment '部门id',
   parent_id            bigint comment '父部门id',
   parent_ids           varchar(255) binary not null comment '父部门id路径',
   dept_name            varchar(100) not null comment '部门名',
   order_value          int not null default 0 comment '排序值',
   update_user_id       bigint,
   update_user_name     varchar(100),
   update_time          datetime
);

alter table department comment '部门';

alter table department
   add primary key (dept_id);

/*==============================================================*/
/* Index: IX_department_name                                    */
/*==============================================================*/
create index IX_department_name on department
(
   dept_name
);

/*==============================================================*/
/* Index: IX_department_order_value                             */
/*==============================================================*/
create index IX_department_order_value on department
(
   order_value
);

/*==============================================================*/
/* Index: IX_department_parent_ids                              */
/*==============================================================*/
create index IX_department_parent_ids on department
(
   parent_ids
);

/*==============================================================*/
/* Table: fs_file                                               */
/*==============================================================*/
create table fs_file
(
   file_id              bigint not null comment '文件id',
   thumb_id             bigint comment '文件id',
   view_id              bigint comment '文件id',
   file_name            varchar(100) not null comment '文件名',
   file_size            bigint not null comment '文件大小',
   file_crc32           bigint not null comment '文件crc32',
   file_md5             varchar(32) not null comment '文件md5',
   img_status           tinyint not null default 0,
   conv_status          tinyint not null default 0,
   create_time          datetime not null comment '创建时间'
);

alter table fs_file comment '文件系统文件';

alter table fs_file
   add primary key (file_id);

/*==============================================================*/
/* Index: IX_fs_file_name                                       */
/*==============================================================*/
create index IX_fs_file_name on fs_file
(
   file_name
);

/*==============================================================*/
/* Index: IX_fs_file_md5                                        */
/*==============================================================*/
create index IX_fs_file_md5 on fs_file
(
   file_md5
);

/*==============================================================*/
/* Table: sequence                                              */
/*==============================================================*/
create table sequence
(
   seq_name             varchar(10) not null,
   seq_value            bigint not null
);

alter table sequence
   add primary key (seq_name);

/*==============================================================*/
/* Table: user                                                  */
/*==============================================================*/
create table user
(
   user_id              bigint not null comment '用户id',
   dept_id              bigint comment '部门id',
   user_name            varchar(100) not null comment '用户名',
   real_name            varchar(100) not null comment '真实姓名',
   user_pwd             varchar(64) comment '密码',
   title                varchar(50) comment '职位',
   number               varchar(50) comment '工号',
   gender               enum('male','female') comment '性别',
   birth                datetime comment '生日',
   mail                 varchar(100) comment '邮件',
   tel                  varchar(20) comment '电话',
   mobile               varchar(20) comment '手机',
   user_status          tinyint not null default 0 comment '用户状态',
   update_user_id       bigint,
   update_user_name     varchar(100),
   update_time          datetime
);

alter table user comment '用户';

alter table user
   add primary key (user_id);

/*==============================================================*/
/* Index: IX_user_name                                          */
/*==============================================================*/
create index IX_user_name on user
(
   user_name
);

/*==============================================================*/
/* Table: yli_file                                              */
/*==============================================================*/
create table yli_file
(
   file_id              bigint not null comment '文件id',
   parent_id            bigint comment '父文件夹id',
   fs_file_id           bigint,
   file_type            varchar(10) not null comment '文件类型',
   parent_ids           varchar(255) not null comment '父文件夹id路径',
   file_name            varchar(100) not null comment '文件名',
   file_size            bigint comment '文件大小',
   thumb                varchar(60),
   folder               bool not null,
   version              bigint not null,
   last_action          varchar(20) not null comment '最后操作',
   conv_status          int not null default 0 comment '转换状态',
   index_status         int not null default 0 comment '索引状态',
   index_time           datetime comment '索引时间',
   del_status           tinyint not null default 0 comment '删除状态',
   creater_id           bigint not null,
   creater_name         varchar(100) not null,
   create_time          datetime not null,
   update_user_id       bigint,
   update_user_name     varchar(100),
   update_time          datetime
);

alter table yli_file comment '文件夹&文件';

alter table yli_file
   add primary key (file_id);

/*==============================================================*/
/* Index: IX_yli_file_name                                      */
/*==============================================================*/
create index IX_yli_file_name on yli_file
(
   file_name
);

/*==============================================================*/
/* Index: IX_fs_file_parent_ids                                 */
/*==============================================================*/
create index IX_fs_file_parent_ids on yli_file
(
   parent_ids
);

alter table department add constraint FK_department_ref_parent foreign key (parent_id)
      references department (dept_id) on delete cascade on update restrict;

alter table fs_file add constraint FK_fs_file_ref_thumb foreign key (thumb_id)
      references fs_file (file_id) on delete set null on update cascade;

alter table fs_file add constraint FK_fs_file_ref_view foreign key (view_id)
      references fs_file (file_id) on delete set null on update cascade;

alter table user add constraint FK_user_ref_department foreign key (dept_id)
      references department (dept_id) on delete set null on update restrict;

alter table yli_file add constraint FK_yli_file_ref_fs_file foreign key (fs_file_id)
      references fs_file (file_id) on delete restrict on update restrict;

alter table yli_file add constraint FK_yli_file_ref_parent foreign key (parent_id)
      references yli_file (file_id) on delete restrict on update restrict;

