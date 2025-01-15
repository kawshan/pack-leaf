package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.IssueNoteHeader;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface IssueNoteHeaderDao extends JpaRepository<IssueNoteHeader,Integer> {

    @Query(value = "select concat('IN',lpad(max(substring(issuenoteheader.headerkey,3))+1,4,'0' )) as max_issue_note from issuenoteheader;",nativeQuery = true)
    public String getMaxIssueNoteHeaderKey();


    @Query(value = "select id from issuenoteheader where headerkey=?1",nativeQuery = true)
    public String getIdFromHeaderKey(String headerKey);

    @Transactional
    @Modifying
    @Query(value = "delete from issuenotedetail where issuenoteheader=?1",nativeQuery = true)
    public void deleteIssueNoteDetailByHeaderKey(String headerKey);

    @Query(value = "select max(issuenotenumber+1) from issuenoteheader as next_issue_note_number;",nativeQuery = true)
    public String getMaxIssueNoteNumber();

}
