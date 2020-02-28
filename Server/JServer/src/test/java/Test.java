import com.wanghan.dao.UserMapper;
import com.wanghan.pojo.User;
import com.wanghan.service.UserService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Test {
    @org.junit.Test
    public void test(){
        ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
        UserService mapper=context.getBean("userServiceImpl", UserService.class);
        User u=new User("wang2han","wanghan2pwd","2,4,5,6","/ret/dsfs");
        System.out.println(mapper.selectPwdByName("wanghan"));
    }
}
