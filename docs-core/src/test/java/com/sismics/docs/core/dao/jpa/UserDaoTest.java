package com.sismics.docs.core.dao.jpa;

import com.sismics.docs.BaseTransactionalTest;
import com.sismics.docs.core.dao.UserDao;
import com.sismics.docs.core.dao.criteria.UserCriteria;
import com.sismics.docs.core.dao.dto.UserDto;
import com.sismics.docs.core.model.jpa.User;
import com.sismics.docs.core.util.TransactionUtil;
import com.sismics.docs.core.util.jpa.SortCriteria;
import org.junit.Assert;
import org.junit.Test;

import java.util.List;

public class UserDaoTest extends BaseTransactionalTest {

    @Test
    public void testFindByCriteria() throws Exception {
        UserDao userDao = new UserDao();

        // 创建用户
        User user1 = createUser("criteriaTest1");
        User user2 = createUser("criteriaTest2");
        TransactionUtil.commit();
        // 设置查询条件
        UserCriteria criteria = new UserCriteria();
        criteria.setUserName("criteriaTest1");  // 通过用户名进行筛选
        SortCriteria sortCriteria = new SortCriteria(1, true);  // 按第一列（例如用户名）升序排序

        // 查询符合条件的用户
        List<UserDto> users = userDao.findByCriteria(criteria, sortCriteria);

        // 验证返回的用户包含刚才创建的
        boolean foundUser1 = users.stream().anyMatch(u -> u.getId().equals(user1.getId()));
        boolean foundUser2 = users.stream().anyMatch(u -> u.getId().equals(user2.getId()));

        Assert.assertTrue(foundUser1);
        Assert.assertTrue(foundUser2);
    }
}