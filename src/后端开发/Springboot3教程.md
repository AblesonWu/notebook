# Spring Boot 3 教程

## MyBatis使用

### 1. 添加依赖

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.30</version>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-dbcp2</artifactId>
    <version>2.9.0</version>
</dependency>

<dependency>
    <groupId>org.mybatis.spring.boot</groupId>
    <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

### 2.添加配置

```txt
spring.datasource.url=jdbc:mysql://localhost:3306/springlearn
spring.datasource.username=ranwu
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.datasource.type=org.apache.commons.dbcp2.BasicDataSource
spring.datasource.dbcp2.max-idle=10
spring.datasource.dbcp2.max-total=50
spring.datasource.dbcp2.max-wait-millis=10000
spring.datasource.dbcp2.initial-size=5

mybatis.mapper-locations=classpath:mapper/**/*.xml
mybatis.type-aliases-package=com.springlearning.springstudy01.pojo
mybatis.type-handlers-package=com.springlearning.springstudy01.typehandler
```

### 3.xml映射文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.springlearning.springstudy01.dao.UserDao">
    <select id="getUser" parameterType="long" resultType="user">
        select id, user_name as userName, gender, note
        from t_user
        where id = #{id}
    </select>
</mapper>
```

### 4.定义Mapper

```java
@Mapper
public interface UserDao {

  User getUser(Long id);
}
```

### 5.类型转换工具

```java
package com.springlearning.springstudy01.typehandler;

import com.springlearning.springstudy01.constants.GenderEnum;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@MappedJdbcTypes(JdbcType.INTEGER)
@MappedTypes(value = GenderEnum.class)
public class GenderTypeHandler extends BaseTypeHandler<GenderEnum> {
  @Override
  public void setNonNullParameter(PreparedStatement preparedStatement, int i, GenderEnum genderEnum, JdbcType jdbcType) throws SQLException {
    preparedStatement.setInt(i, genderEnum.getId());
  }

  @Override
  public GenderEnum getNullableResult(ResultSet resultSet, String s) throws SQLException {
    int gender = resultSet.getInt(s);
    if (gender != 1 && gender != 2) {
      return null;
    }
    return GenderEnum.getEnumById(gender);
  }

  @Override
  public GenderEnum getNullableResult(ResultSet resultSet, int i) throws SQLException {
    int gender = resultSet.getInt(i);
    if (gender != 1 && gender != 2) {
      return null;
    }
    return GenderEnum.getEnumById(gender);
  }

  @Override
  public GenderEnum getNullableResult(CallableStatement callableStatement, int i) throws SQLException {
    int gender = callableStatement.getInt(i);
    if (gender != 1 && gender != 2) {
      return null;
    }
    return GenderEnum.getEnumById(gender);
  }
}
```
