package com.packleaf.packleaf.dao;

import com.packleaf.packleaf.entity.IssueNoteDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IssueNoteDetailDao extends JpaRepository<IssueNoteDetail,Integer> {

    @Query("select ind from IssueNoteDetail ind where ind.issuenoteheader=?1")
    public List<IssueNoteDetail> getAllIssueNoteDetailByIssueNoteHeader(String issueNoteHeader);

//    public List<IssueNoteDetail> getAllByIssuenoteheader(String issuenoteheader);


}
