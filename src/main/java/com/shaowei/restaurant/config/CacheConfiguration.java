package com.shaowei.restaurant.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.shaowei.restaurant.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.Desk.class.getName(), jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.Desk.class.getName() + ".ordres", jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.Desk.class.getName() + ".payments", jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.Ordre.class.getName(), jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.Payment.class.getName(), jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.Payment.class.getName() + ".ordres", jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.Restaurant.class.getName(), jcacheConfiguration);
            cm.createCache(com.shaowei.restaurant.domain.Restaurant.class.getName() + ".desks", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
