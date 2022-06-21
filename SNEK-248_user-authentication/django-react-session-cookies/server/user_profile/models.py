from django.db import models
from django.contrib.auth.models import User 


class UserProfile(models.Model):
  user = models.OneToOneField(User,on_delete=models.CASCADE)
  username = models.CharField(max_length=100, default='')  
  first_name = models.CharField(max_length=100, blank=True)  
  last_name = models.CharField(max_length=100, blank=True)  
  email = models.CharField(max_length=50, unique=True)
  title = models.CharField(max_length=50, blank=True)
  company = models.ForeignKey(
          'Company', null=True, blank=True, on_delete=models.PROTECT)

  def __str__(self):
        """Return string representation."""
        return f'{self.email}'

  class Meta:
      verbose_name = 'UserProfile'
      verbose_name_plural = 'UserProfiles'  


class Company(models.Model):
    """Data model for companies the contacts are a part of."""

    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        """Return string representation."""
        return self.name

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'